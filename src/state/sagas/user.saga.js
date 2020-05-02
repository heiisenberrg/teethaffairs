import { call, put } from 'redux-saga/effects';
import {
	getLoginSuccess,
	getLoginFailure,
	getSignUpSuccess,
	getSignUpFailure,
	getForgetEmailSuccess,
	getForgetEmailFailure,
	getOneTimePasswordSuccess,
	getOneTimePasswordFailure,
	getPasswordSuccess,
	getPasswordFailure,
	getLogOutSuccess,
	getLogOutFailure,
	getUserSuccess,
	getUserFailure,
	getUsersSuccess,
	getUsersFailure,
	getMyProfileSuccess,
	getMyProfileFailure,
	editUserSuccess,
	editUserFailure
} from '../actions/user';

import {
	login,
	signup,
	verifyEmail,
	forgotPassword,
	resetPin,
	logout,
	getUser,
	editUser,
	getUserList,
	getProfile
} from '../services/user.service';
import FlashMessage from '../../components/global/FlashMessage';
import localStorage from '../localstorage';

export function* fetchLogin(action) {
	const { data } = action;
	try {
		const response = yield call(login, data);
		localStorage.setItem('accessToken', response.data.access);
		localStorage.storeJsonValues('user', response.data);
		yield put(getLoginSuccess(response.data));
	} catch (e) {
		FlashMessage.message('Alert', 'Please check your password or username', '#ff4444');
		yield put(getLoginFailure(e));
	}
}

export function* fetchSignup(action) {
	const { data } = action;
	try {
		const response = yield call(signup, data.data);
		yield put(getSignUpSuccess(response.data));
	} catch (e) {
		FlashMessage.message('Alert', 'Something went wrong.Please try again later', '#ff4444');
		yield put(getSignUpFailure(e));
	}
}

// Used in Email Verification
export function* fetchVerifyEmail(action) {
	const { data } = action;
	try {
		const response = yield call(verifyEmail, data);
		yield put(getOneTimePasswordSuccess(response));
	} catch (e) {
		yield put(getOneTimePasswordFailure(e));
	}
}

export function* fetchForgetPassword(action) {
	const { data } = action;
	try {
		const response = yield call(forgotPassword, data.data);
		data.onSuccess();
		yield put(getForgetEmailSuccess(response));
	} catch (e) {
		FlashMessage.message('Alert', 'Something went wrong.Please try again later', '#ff4444');
		yield put(getForgetEmailFailure(e));
	}
}

// Used in Reset password 
export function* fetchResetPin(action) {
	const { data } = action;
	try {
		const response = yield call(resetPin, data);
		yield put(getPasswordSuccess(response));
	} catch (e) {
		yield put(getPasswordFailure(e));
	}
}

export function* fetchLogOut(action) {
	const { data: navigation } = action;
	try {
		const response = yield call(logout);
		yield localStorage.clearAll();
		navigation.navigate('Login');
		yield put(getLogOutSuccess(response));
		FlashMessage.message('', 'Logged out successfully!', '#00C851');
	} catch (e) {
		yield put(getLogOutFailure(e));
		navigation.navigate('Login');
		FlashMessage.message('', 'Logged out successfully!', '#00C851');
	}
}

// Not used
export function* fetchUser() {
	try {
		const response = yield call(getUser);
		yield put(getUserSuccess(response));
	} catch (e) {
		yield put(getUserFailure(e));
	}
}

// Not used
export function* updateUser(action) {
	const { data } = action;
	try {
		const response = yield call(editUser, data);
		yield put(editUserSuccess(response));
	} catch (e) {
		yield put(editUserFailure(e));
	}
}

export function* getUsers() {
	try {
		const response = yield call(getUserList);
		yield put(getUsersSuccess(response.data));
	} catch (e) {
		yield put(getUsersFailure(e));
	}
}

export function* getMyProfile() {
	try {
		const response = yield call(getProfile);
		yield put(getMyProfileSuccess(response));
	} catch (e) {
		yield put(getMyProfileFailure(e));
	}
}
