import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import axios from 'axios';

import { axiosInstance } from '../../utilities/api-request';
import {
	GET_LOGIN,
	GET_SIGNUP,
	GET_ONE_TIME_PASSWORD,
	GET_FORGET_EMAIL,
	GET_PASSWORD,
	GET_LOGOUT,
	GET_USER,
	UPDATE_USER,
	GET_USERS,
	GET_MY_PROFILE
} from '../constants/user';
import {
	setLogin,
	setSignUp,
	setOneTimePassword,
	setForgetPassword,
	setPassword,
	setLogOut,
	setUser,
	setUsers,
	setMyProfile
} from '../actions/user';
import { apiCall } from '../../utilities/axios-interceptor';
import Endpoints from '../../constants/endPoint';

const signupURL = '/dental_auth/sign-up/';
const verifyEmailURL = '/dental_auth/verify-email/';
const forgetPasswordURL = '/dental_auth/forgot-pin/';
const resetPinURL = '/dental_auth/pin-reset/';
const logoutURL = '/dental_auth/logout/';
const getUserURL = '/users/user/me/';
const updateUserURL = '/users/update-me/';
const getUsersURL = '/users/user/';

function customAxios(payload) {
	return axiosInstance(payload);
}

function toLogin(response, onSuccess) {
	return setLogin(onSuccess(response));
}

function fetchLoginEpic(action$) {
	return action$.pipe(
		ofType(GET_LOGIN),
		mergeMap(fetchLogin)
	);
}

function fetchLogin(payload) {
	const { onFailure, onSuccess } = payload;
	const data = {
		...payload.payload,
		publicRoute: true,
		headers: {}
	};

	return from(
		axios({
			url: 'http://test1.teethaffairs.com:8000/dental_auth/login/',
			method: 'POST',
			data
		})
	).pipe(
		map(response => toLogin(response.data, onSuccess)),
		catchError(error =>
			of({
				type: 'FETCH_LOGIN_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toSignUp(response, onSuccess) {
	return setSignUp(onSuccess(response));
}

function fetchSignUpEpic(action$) {
	return action$.pipe(
		ofType(GET_SIGNUP),
		mergeMap(fetchSignup)
	);
}

function fetchSignup(payload) {
	const { onFailure, onSuccess } = payload;
	const data = {
		...payload.payload,
		publicRoute: true,
		headers: {}
	};

	return from(
		customAxios({
			url: signupURL,
			method: 'POST',
			data
		})
	).pipe(
		map(response => toSignUp(response.data, onSuccess)),
		catchError(error =>
			of({
				type: 'FETCH_SIGNUP_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toVerify(response) {
	return setOneTimePassword(response);
}

function fetchEmailVerifyEpic(action$) {
	return action$.pipe(
		ofType(GET_ONE_TIME_PASSWORD),
		mergeMap(fetchVerifyEmail)
	);
}

function fetchVerifyEmail(payload) {
	const { onFailure } = payload;
	const data = {
		...payload.payload,
		publicRoute: true,
		headers: {}
	};

	return from(
		customAxios({
			url: verifyEmailURL,
			method: 'POST',
			data
		})
	).pipe(
		map(response => toVerify(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_VERIFY_EMAIL_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toForgetPassword(response, onSuccess) {
	return setForgetPassword(onSuccess(response));
}

function fetchForgetPasswordEpic(action$) {
	return action$.pipe(
		ofType(GET_FORGET_EMAIL),
		mergeMap(fetchForgetPassword)
	);
}

function fetchForgetPassword(payload) {
	const { onFailure, onSuccess } = payload;
	const data = {
		...payload.payload,
		publicRoute: true,
		headers: {}
	};

	return from(
		customAxios({
			url: forgetPasswordURL,
			method: 'POST',
			data
		})
	).pipe(
		map(response => toForgetPassword(response.data, onSuccess)),
		catchError(error =>
			of({
				type: 'FETCH_FORGET_PASSWORD_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toReset(response, onSuccess) {
	return setPassword(onSuccess(response));
}

function fetchResetPinEpic(action$) {
	return action$.pipe(
		ofType(GET_PASSWORD),
		mergeMap(fetchResetPin)
	);
}

function fetchResetPin(payload) {
	const { onFailure, onSuccess } = payload;
	const data = {
		...payload.payload,
		publicRoute: true,
		headers: {}
	};

	return from(
		customAxios({
			url: resetPinURL,
			method: 'POST',
			data
		})
	).pipe(
		map(response => toReset(response.data, onSuccess)),
		catchError(error =>
			of({
				type: 'FAILURE_RESPONSE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toLogOut() {
	return setLogOut();
}

function fetchLogOutEpic(action$) {
	return action$.pipe(
		ofType(GET_LOGOUT),
		mergeMap(fetchLogOut)
	);
}

function fetchLogOut(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: logoutURL,
			method: 'POST',
			withCredentials: true
		})
	).pipe(
		map(() => toLogOut()),
		catchError(error =>
			of({
				type: 'FETCH_LOGOUT_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toGetUser(response) {
	return setUser(response);
}

function getUserEpic(action$) {
	return action$.pipe(
		ofType(GET_USER),
		mergeMap(fetchUser)
	);
}

function fetchUser(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: getUserURL,
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			withCredentials: true
		})
	).pipe(
		map(response => toGetUser(response.data)),
		catchError(error =>
			of({
				type: 'GET_USER_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toUpdateUser(response) {
	return setUser(response);
}

function updateUserEpic(action$) {
	return action$.pipe(
		ofType(UPDATE_USER),
		mergeMap(updateUser)
	);
}

function updateUser(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: updateUserURL,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			data: { ...payload.payload.data },
			withCredentials: true
		})
	).pipe(
		map(response => toUpdateUser(response.data)),
		catchError(error =>
			of({
				type: 'UPDATE_USER_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toSetUsers(response) {
	return setUsers(response);
}

function getUsersEpic(action$) {
	return action$.pipe(
		ofType(GET_USERS),
		mergeMap(getUsers)
	);
}

function getUsers() {
	return from(
		apiCall({
			url: getUsersURL,
			method: 'GET',
			withCredentials: true
		})
	).pipe(
		map(response => toSetUsers(response.data)),
		catchError(error => {
			return of({
				type: 'GET_USERS_FAILURE',
				payload: error.response
			});
		})
	);
}

function toSetProfileData(response) {
	return setMyProfile(response);
}

function getMyProfileEpic(action$) {
	return action$.pipe(
		ofType(GET_MY_PROFILE),
		mergeMap(getMyProfile)
	);
}

function getMyProfile() {
	return from(
		apiCall({
			url: Endpoints.GET_MY_PROFILE,
			method: 'GET',
			withCredentials: true
		})
	).pipe(
		map(response => toSetProfileData(response.data)),
		catchError(error => {
			return of({
				type: 'GET_MY_PROFILE_FAILURE',
				payload: error.response
			});
		})
	);
}

export {
	fetchLoginEpic,
	fetchSignUpEpic,
	fetchEmailVerifyEpic,
	fetchForgetPasswordEpic,
	fetchResetPinEpic,
	fetchLogOutEpic,
	getUserEpic,
	updateUserEpic,
	getUsersEpic,
	getMyProfileEpic
};
