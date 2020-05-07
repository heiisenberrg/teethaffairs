import { apiCall, uploadFile } from '../../utilities/axios-interceptor.js';
import {
	USER_LOGIN,
	SIGNUP,
	VERIFY_EMAIL,
	FORGET_PASSWORD,
	RESET_PIN,
	LOGOUT,
	GET_USER,
	UPDATE_USER,
	GET_USERS,
	GET_MY_PROFILE,
	UPDATE_DEVICE_TOKEN,
	SUBMIT_QUERY,
	UPLOAD_PROFILE_PIC
} from '../config';

export const login = data =>
	apiCall({
		url: USER_LOGIN,
		method: 'POST',
		data,
		withCredentials: true
	});

export const signup = data =>
	apiCall({
		url: SIGNUP,
		method: 'POST',
		data
	});

export const verifyEmail = data =>
	apiCall({
		url: VERIFY_EMAIL,
		method: 'POST',
		data
	});

export const forgotPassword = data =>
	apiCall({
		url: FORGET_PASSWORD,
		method: 'POST',
		data
	});

export const resetPin = data =>
	apiCall({
		url: RESET_PIN,
		method: 'POST',
		data
	});

export const logout = () =>
	apiCall({
		url: LOGOUT,
		method: 'POST',
		withCredentials: true
	});

export const getUser = () =>
	apiCall({
		url: GET_USER,
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const editUser = data =>
	apiCall({
		url: UPDATE_USER,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		data,
		withCredentials: true
	});

export const getUserList = () =>
	apiCall({
		url: GET_USERS,
		method: 'GET',
		withCredentials: true
	});

export const getProfile = () =>
	apiCall({
		url: GET_MY_PROFILE,
		method: 'GET',
		withCredentials: true
	});

export const updateDeviceToken = data =>
	apiCall({
		url: UPDATE_DEVICE_TOKEN,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		data,
		withCredentials: true
	});

export const submitQuery = data =>
	apiCall({
		url: SUBMIT_QUERY,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		data,
		withCredentials: true
	});

export const uploadMyProfilePicture = data => uploadFile({
	url: `${UPLOAD_PROFILE_PIC}`,
	method: 'POST',
	data,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'multipart/form-data'
	},
	withCredentials: true
});