import constants from '../constants/user.constant';

export const setDeviceToken = token => ({
	type: constants.SET_DEVICE_TOKEN,
	token
});

export const getLogin = (data, token) => ({
	type: constants.GET_LOGIN,
	data,
	token
});

export const getLoginSuccess = response => ({
	type: constants.GET_LOGIN_SUCCESS,
	response
});

export const getLoginFailure = error => ({
	type: constants.GET_LOGIN_FAILURE,
	error
});

export const getSignUp = (data, onSuccess, onFailure) => ({
	type: constants.GET_SIGNUP,
	data,
	onSuccess,
	onFailure
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

export const getLogOut = data => ({
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

export const clearUser = () => ({
	type: constants.CLEAR_USER
});

export const submitContactUs = data => ({
	type: constants.SUBMIT_CONTACT_US,
	data
});

export const submitContactUsSuccess = response => ({
	type: constants.SUBMIT_CONTACT_US_SUCCESS,
	response
});

export const submitContactUsFailure = error => ({
	type: constants.SUBMIT_CONTACT_US_FAILURE,
	error
});

export const uploadProfilePicture = data => ({
	type: constants.UPLOAD_PROFILE_PICTURE,
	data
});

export const uploadProfilePictureSuccess = response => ({
	type: constants.UPLOAD_PROFILE_PICTURE_SUCCESS,
	response
});

export const uploadProfilePictureFailure = error => ({
	type: constants.UPLOAD_PROFILE_PICTURE,
	error
});

export const getNotifications = () => ({
	type: constants.GET_NOTIFICATIONS
});

export const getNotificationsSuccess = response => ({
	type: constants.GET_NOTIFICATIONS_SUCCESS,
	response
});

export const getNotificationsFailure = error => ({
	type: constants.GET_NOTIFICATIONS_FAILURE,
	error
});

export const getCheckName = (data, onSuccess, onFailure) => ({
	type: constants.GET_CHECK_NAME,
	data,
	onSuccess,
	onFailure
});

export const getCheckNameSuccess = response => ({
	type: constants.GET_CHECK_NAME_SUCCESS,
	response
});

export const getCheckNameFailure = error => ({
	type: constants.GET_CHECK_NAME_FAILURE,
	error
});
