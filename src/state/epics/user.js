import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';

import { axiosInstance } from '../../utilities/api-request';
import {
	GET_LOGIN,
	GET_SIGNUP,
	GET_ONE_TIME_PASSWORD,
	GET_FORGET_EMAIL,
	GET_PASSWORD,
	GET_LOGOUT
} from '../constants/user';
import {
	setLogin,
	setSignUp,
	setOneTimePassword,
	setForgetPassword,
	setPassword,
	setLogOut
} from '../actions/user';

const loginURL = '/dental_auth/login/';
const signupURL = '/dental_auth/sign-up/';
const verifyEmailURL = '/dental_auth/verify-email/';
const forgetPasswordURL = '/dental_auth/forgot-pin/';
const resetPinURL = '/dental_auth/pin-reset/';
const logoutURL = '/dental_auth/logout/';

function customAxios(payload) {
	return axiosInstance(payload);
}

function toLogin(response) {
	return setLogin(response);
}

function fetchLoginEpic(action$) {
	return action$.pipe(ofType(GET_LOGIN), mergeMap(fetchLogin));
}

function fetchLogin(payload) {
	const { onFailure } = payload;
	const data = {
		...payload.payload,
		publicRoute: true,
		headers: {}
	};

	return from(
		customAxios({
			url: loginURL,
			method: 'POST',
			data
		})
	).pipe(
		map(response => toLogin(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_LOGIN_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toSignUp(response) {
	return setSignUp(response);
}

function fetchSignUpEpic(action$) {
	return action$.pipe(ofType(GET_SIGNUP), mergeMap(fetchSignup));
}

function fetchSignup(payload) {
	const { onFailure } = payload;
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
		map(response => toSignUp(response.data)),
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

function toForgetPassword(response) {
	return setForgetPassword(response);
}

function fetchForgetPasswordEpic(action$) {
	return action$.pipe(ofType(GET_FORGET_EMAIL), mergeMap(fetchForgetPassword));
}

function fetchForgetPassword(payload) {
	const { onFailure } = payload;
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
		map(response => toForgetPassword(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_FORGET_PASSWORD_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toReset(response) {
	return setPassword(response);
}

function fetchResetPinEpic(action$) {
	return action$.pipe(ofType(GET_PASSWORD), mergeMap(fetchResetPin));
}

function fetchResetPin(payload) {
	const { onFailure } = payload;
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
		map(response => toReset(response.data)),
		catchError(error =>
			of({
				type: 'FAILURE_RESPONSE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toLogOut(response) {
	return setLogOut(response);
}

function fetchLogOutEpic(action$) {
	return action$.pipe(ofType(GET_LOGOUT), mergeMap(fetchLogOut));
}

function fetchLogOut(payload) {
	const { onFailure } = payload;

	const data = {
		publicRoute: true,
		headers: {}
	};

	return from(
		customAxios({
			url: logoutURL,
			method: 'POST',
			data
		})
	).pipe(
		map(response => toLogOut(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_LOGOUT_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

export {
	fetchLoginEpic,
	fetchSignUpEpic,
	fetchEmailVerifyEpic,
	fetchForgetPasswordEpic,
	fetchResetPinEpic,
	fetchLogOutEpic
};
