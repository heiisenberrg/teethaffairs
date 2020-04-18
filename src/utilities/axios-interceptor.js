import axios from 'axios';
import store from '../state/store';
// import { refreshTheToken } from '../state/actions/user';
import RNFetchBlob from 'rn-fetch-blob';

const baseHeaders = {
	'Content-Type': 'application/json'
};

export const client = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://test1.teethaffairs.com:8000'
			: 'api.teethaffairs.com'
});

export const apiCall = (params = {}) => {
  const data = formData(params);
	switch (params.method) {
		case 'GET':
           return client.get(data.url, data.headers);
		case 'POST':
           return client.post(data.url, data.data, data.headers);
		case 'PUT':
           return client.put(data.url, data.data, data.headers);
		case 'DELETE':
           return client.delete(data.url, data.headers);
		case 'PATCH':
           return client.patch(data.url, data.data, data.headers);
        default:
          return;
	}
};

const formData = (data = {}) => {
	if (
		data.headers &&
		Object.keys(data.headers).length > 0 &&
		data.headers.hasOwnProperty('Content-Type')
	) {
		switch (data.headers['Content-Type']) {
			case 'application/x-www-form-urlencoded':
				data.data = `${encodeURIComponent(JSON.stringify(data.data))}`;
				break;
			case 'application/json': {
				if (
					data.method === 'GET' &&
					data.data &&
					Object.keys(data.data).length > 0
				) {
					let queryParams = '';
					let count = 0;
					for (let key in data.data) {
						if (typeof data.data[key] === 'string') {
							queryParams += `${key}=${data.data[key]}${Object.keys(data.data).length > count ? '&' : ''}`;
						} else if (typeof data.data[key] === 'object') {
							queryParams += `${key}=${encodeURIComponent(
								JSON.stringify(data.data[key])
							)}`;
						}
						count += 1;
					}
					data.url += `?${queryParams}`;
				}
				break;
			}
			case 'multipart/form-data': {
				let formData = new FormData();
				for (let key in data.data) {
					formData.append(key, data.data[key]);
				}
				data.data = formData;
				break;
			}
			default:
				break;
		}
	} else {
		data.headers = baseHeaders;
	}
	const token =
		process.env.NODE_ENV === 'test'
			? '123456'
			: 'Bearer ' + store.getState().user.access;
	if (data.withCredentials) {
		client.defaults.headers.common['Authorization'] = token;
	}
	return data;
};

client.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		console.log('inside axios error', error);
		if (error.response.status && parseInt(error.response.status, 0) > 205) {
			switch (error.response.status) {
				case 500:
					throw new Error(
						'Something went wrong.  Please check your information and try again.'
					);
				case 401:
					return refreshTokenAndReattemptRequest(error);
				default:
					throw new Error(
						'Something went wrong.  Please check your information and try again.'
					);
			}
		}
	}
);

const refreshTokenAndReattemptRequest = error => {
	try {
		const { response: errorResponse } = error;
		let currentRefreshToken = store.getState().user.refresh;
		if (process.env.NODE_ENV === 'test') {
			currentRefreshToken = '123456';
		}
		if (
			!currentRefreshToken ||
			(error.response.status === 401 &&
				error.response.data.detail === 'Token is blacklisted')
		) {
			return Promise.reject(error);
		}
		const retryOriginalRequest = errorResponse.config;
		errorResponse.config.headers.AUTHORIZATION = `Bearer ${
			store.getState().user.access
		}`;
		if (process.env.NODE_ENV === 'test') {
			errorResponse.config.headers.afterRefresh = 'true';
		}
		return axios(retryOriginalRequest);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const uploadFile = (params) => {
	const { method, url, headerConfig, data } = params;
	const requestUrl = `${client.defaults.baseURL}/${url}`;
	const headers =  {
		Authorization: `Bearer ${store.getState().user.access}`,
		...headerConfig
	};
	return RNFetchBlob.fetch(method, requestUrl, headers, data)
	.then(response => response.json())
	.then(response => response)
	.catch(error => error);
};