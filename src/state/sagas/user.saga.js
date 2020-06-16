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
	editUserFailure,
	clearUser,
	submitContactUsSuccess,
	submitContactUsFailure,
	uploadProfilePictureSuccess,
	uploadProfilePictureFailure,
	getNotificationsSuccess,
	getNotificationsFailure,
	getCheckNameSuccess,
	getCheckNameFailure
} from '../actions/user';

import { clearDoctor } from '../actions/doctor';
import { clearHistory } from '../actions/history';
import { clearJournal } from '../actions/journal';
import { clearReminder } from '../actions/reminder';

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
	getProfile,
	updateDeviceToken,
	submitQuery,
	uploadMyProfilePicture,
	fetchNotifications,
	checkUserName
} from '../services/user.service';
import FlashMessage from '../../components/global/FlashMessage';
import localStorage from '../localstorage';
import { CommonActions } from '@react-navigation/native';

export function* fetchLogin(action) {
	const { data, token } = action;
	try {
		const response = yield call(login, data);
		localStorage.setItem('accessToken', response.data.access);
		localStorage.storeJsonValues('user', response.data);
		yield put(getLoginSuccess(response.data));
		yield call(updateDeviceToken, { device_id: token });
	} catch (e) {
		FlashMessage.message(
			'Failure',
			'Please check your password or username',
			'#ff4444'
		);
		yield put(getLoginFailure(e));
	}
}

export function* fetchSignup(action) {
	const { data, onSuccess } = action;
	try {
		const response = yield call(signup, data);
		onSuccess();
		yield put(getSignUpSuccess(response.data));
	} catch (e) {
		FlashMessage.message(
			'Failure',
			'Something went wrong.Please try again later',
			'#ff4444'
		);
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
		FlashMessage.message(
			'Failure',
			'Something went wrong.Please try again later',
			'#ff4444'
		);
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
	const {
		data: { navigation, onSuccess }
	} = action;
	try {
		const response = yield call(logout);
		yield localStorage.clearAll();
		yield put(clearUser());
		yield put(clearDoctor());
		yield put(clearHistory());
		yield put(clearJournal());
		yield put(clearReminder());
		navigation.dispatch(
			CommonActions.reset({
				index: 2,
				routes: [ { name: 'OnBoarding', key: 'Login' } ]
			})
		);
		onSuccess();
		yield put(getLogOutSuccess(response));
		FlashMessage.message('', 'Logged out successfully!', '#00C851');
	} catch (e) {
		yield localStorage.clearAll();
		yield put(clearUser());
		yield put(clearDoctor());
		yield put(clearHistory());
		yield put(clearJournal());
		yield put(clearReminder());
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [ { name: 'OnBoarding', key: 'Login' } ]
			})
		);
		onSuccess();
		yield put(getLogOutFailure(e));
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
		localStorage.storeJsonValues('user', response.data);
		FlashMessage.message('Success', 'Profile saved successfully.', '#00C851');
		yield put(editUserSuccess(response));
	} catch (e) {
		FlashMessage.message('Failure', 'Profile updated failed.', '#ff4444');
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

export function* submitContactUsQuery(action) {
	const { data } = action;
	try {
		const response = yield call(submitQuery, data);
		FlashMessage.message('Success', 'Query sent successfully', '#00C851');
		yield put(submitContactUsSuccess(response.data));
	} catch (e) {
		FlashMessage.message(
			'Failure',
			'Something went wrong.Please try again later',
			'#ff4444'
		);
		yield put(submitContactUsFailure(e));
	}
}

export function* uploadProfilePicture(action) {
	const { data } = action;
	try {
		const response = yield call(uploadMyProfilePicture, data);
		FlashMessage.message(
			'Success',
			'Profile picture updated successfully.',
			'#00C851'
		);
		yield put(uploadProfilePictureSuccess(response.data));
	} catch (e) {
		FlashMessage.message(
			'Failure',
			'Upload failed. Please try after sometime.',
			'#ff4444'
		);
		yield put(uploadProfilePictureFailure(e));
	}
}

export function* getNotifications() {
	try {
		const response = yield call(fetchNotifications);
		yield put(getNotificationsSuccess(response.data));
	} catch (e) {
		yield put(getNotificationsFailure(e));
	}
}

export function* fetchCheckName(action) {
	const { data, onSuccess, onFailure } = action;
	try {
		const response1 = yield call(checkUserName, data);
		yield put(getCheckNameSuccess(response1.data));
		onSuccess();
	} catch (e) {
		yield put(getCheckNameFailure(e));
		onFailure();
	}
}
