import axios from 'axios';
import store from '../state/store';
import RNFetchBlob from 'rn-fetch-blob';
import { refreshTheToken } from '../state/actions/user';
import { isNonEmptyObject } from './object';

let subscribers = [];
let isAlreadyFetchingAccessToken = false;

export const getQueryParams = options => {
	// pass in JSON object get back key/value pairs as url query string. i.e. ?key=value&key2=value2
	let queryParams = '';

	if (options) {
		queryParams = Object.keys(options).reduce(
			(initialStr, key, index, inputArr) => {
				let queryStr = initialStr;

				const isLastElement = inputArr.length - 1 === index;

				if (isLastElement) {
					queryStr += `${key}=${options[key]}`;
				} else {
					queryStr += `${key}=${options[key]}&`;
				}

				return queryStr;
			},
			'?'
		);
	}
	return queryParams;
};

export const getHostName = () => {
	const hostname =
		process.env.NODE_ENV === 'development'
			? 'test1.teethaffairs.com:8000'
			: 'api.teethaffairs.com';

	return hostname;
};

export const hostName = getHostName();

function isPropertyInObject(obj, property) {
	return Object.prototype.hasOwnProperty.call(obj, property);
}

function isPrivateRoute(config = {}) {
	return Boolean(
		config.data &&
			isPropertyInObject(config.data, 'publicRoute') &&
			!config.data.publicRoute
	);
}

const isTokenExpiredError = errorResponse =>
	errorResponse &&
	errorResponse.status === 401 &&
	errorResponse.data.code === 'token_not_valid';

const addSubscriber = callback => {
	subscribers.push(callback);
};

const onAccessTokenFetched = () => {
	const accessToken = store.getState().user.access;

	subscribers.forEach(callback => callback(accessToken));
	subscribers = [];
};

const getRequest = errorResponse =>
	new Promise(resolve => {
		const response = errorResponse;

		addSubscriber(accessToken => {
			response.config.headers.AUTHORIZATION = `Bearer ${accessToken}`;
			if (process.env.NODE_ENV === 'test') {
				response.config.headers.afterRefresh = 'true';
			}
			resolve(axios(response.config));
		});
	});

const getRefreshedTokens = async freshToken => {
	await store.dispatch(refreshTheToken(freshToken, onAccessTokenFetched));
};

const refreshTokenAndReattemptRequest = async error => {
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
		const retryOriginalRequest = getRequest(errorResponse);

		if (!isAlreadyFetchingAccessToken) {
			isAlreadyFetchingAccessToken = true;

			await getRefreshedTokens(currentRefreshToken);
		}
		return retryOriginalRequest;
	} catch (err) {
		return Promise.reject(err);
	}
};

const requestHandler = request => {
	if (isPrivateRoute(request)) {
		let accessToken = store.getState().user.access;

		if (process.env.NODE_ENV === 'test') {
			accessToken = '123456';
		}

		if (isNonEmptyObject(request.data.headers)) {
			request.headers = {
				...request.headers,
				...request.data.headers
			};
		}
		request.headers.AUTHORIZATION = `Bearer ${accessToken}`;
	}

	delete request.data.headers;
	delete request.data.publicRoute;

	return request;
};

const errorHandler = error => {
	const thisError = { ...error };

	if (isPrivateRoute(thisError.config)) {
		if (isTokenExpiredError(thisError.response)) {
			return refreshTokenAndReattemptRequest(thisError);
		}
	}

	if (thisError.response && thisError.response.status >= 500) {
		thisError.response.data = {
			fivehundred:
				'Something went wrong.  Please check your information and try again.'
		};
	}

	return Promise.reject(thisError);
};

const successHandler = response => {
	return response;
};

export const axiosInstance = axios.create({
	baseURL: `http://${hostName}`
});

axiosInstance.interceptors.request.use(request => requestHandler(request));
axiosInstance.interceptors.response.use(
	response => successHandler(response),
	error => errorHandler(error)
);

export function customNoteRequest(noteData, onSuccess) {
	return fetch('http://test1.teethaffairs.com:8000/notes/patient-notes/', {
		method: 'POST',
		headers: new Headers({
			Authorization: `Bearer ${store.getState().user.access}`
		}),
		body: noteData
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch(() => {});
}

export function customRequest(endpoint, payload, onSuccess, onFailure) {
	const requestUrl = `http://${hostName}/${endpoint}`;
	return fetch(requestUrl, {
		method: 'POST',
		headers: new Headers({
			Authorization: `Bearer ${store.getState().user.access}`
		}),
		body: payload
	})
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch(error => {
			onFailure(error);
		});
}

export const uploadFile = (params, onSuccess, onFailure) => {
	const { method, path, headerConfig, data } = params;
	const requestUrl = `http://${hostName}/${path}`;
	const headers = {
		Authorization: `Bearer ${store.getState().user.access}`,
		...headerConfig
	};
	RNFetchBlob.fetch(method, requestUrl, headers, data)
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch(error => {
			onFailure(error);
		});
};

export function customNoteUpdateRequest(
	noteID,
	noteData,
	onSuccess,
	onFailure
) {
	return fetch(
		'http://test1.teethaffairs.com:8000/notes/patient-notes/' + noteID + '/',
		{
			method: 'PUT',
			headers: new Headers({
				Authorization: `Bearer ${store.getState().user.access}`
			}),
			body: noteData
		}
	)
		.then(response => response.json())
		.then(response => {
			onSuccess(response);
		})
		.catch(error => {
			onFailure(error);
		});
}
