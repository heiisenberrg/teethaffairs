import constants from '../constants/user.constant';

export const getLogin = data => ({
	type: constants.GET_LOGIN,
	data
});

export const getLoginSuccess = response => ({
	type: constants.GET_LOGIN_SUCCESS,
	response
});

export const getLoginFailure = error => ({
	type: constants.GET_LOGIN_FAILURE,
	error
});

export const getSignUp = data => ({
	type: constants.GET_SIGNUP,
	data
});

export const getSignUpSuccess = response => ({
	type: constants.GET_SIGNUP_SUCCESS,
	response
});

export const getSignUpFailure = error => ({
	type: constants.GET_SIGNUP_FAILURE,
	error
});

export const getForgetEmail = data => ({
	type: constants.GET_FORGET_EMAIL,
	data
});

export const getForgetEmailSuccess = response => ({
	type: constants.GET_FORGET_EMAIL_SUCCESS,
	response
});

export const getForgetEmailFailure = error => ({
	type: constants.GET_FORGET_EMAIL_FAILURE,
	error
});

export const getOneTimePassword = data => ({
	type: constants.GET_ONE_TIME_PASSWORD,
	data
});

export const getOneTimePasswordSuccess = response => ({
	type: constants.GET_ONE_TIME_PASSWORD_SUCCESS,
	response
});

export const getOneTimePasswordFailure = error => ({
	type: constants.GET_ONE_TIME_PASSWORD_FAILURE,
	error
});

export const getPassword = data => ({
	type: constants.GET_PASSWORD,
	data
});

export const getPasswordSuccess = response => ({
	type: constants.GET_PASSWORD_SUCCESS,
	response
});

export const getPasswordFailure = error => ({
	type: constants.GET_PASSWORD_FAILURE,
	error
});

export const getLogOut = (data) => ({
	type: constants.GET_LOGOUT,
	data
});

export const getLogOutSuccess = response => ({
	type: constants.GET_LOGOUT_SUCCESS,
	response
});

export const getLogOutFailure = error => ({
	type: constants.GET_LOGOUT_FAILURE,
	error
});

export const getUser = () => ({
	type: constants.GET_USER
});

export const getUserSuccess = response => ({
	type: constants.GET_USER_SUCCESS,
	response
});

export const getUserFailure = error => ({
	type: constants.GET_USER_FAILURE,
	error
});

export const getUsers = () => ({
	type: constants.GET_USERS
});

export const getUsersSuccess = response => ({
	type: constants.GET_USERS_SUCCESS,
	response
});

export const getUsersFailure = error => ({
	type: constants.GET_USERS_FAILURE,
	error
});

export const editUser = data => ({
	type: constants.UPDATE_USER,
	data
});

export const editUserSuccess = response => ({
	type: constants.UPDATE_USER_SUCCESS,
	response
});

export const editUserFailure = error => ({
	type: constants.UPDATE_USER_FAILURE,
	error
});

export const getMyProfile = () => ({
	type: constants.GET_MY_PROFILE
});

export const getMyProfileSuccess = response => ({
	type: constants.GET_MY_PROFILE_SUCCESS,
	response
});

export const getMyProfileFailure = error => ({
	type: constants.GET_MY_PROFILE_FAILURE,
	error
});
