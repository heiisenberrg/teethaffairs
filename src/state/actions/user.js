import {
	GET_LOGIN,
	SET_LOGIN,
	GET_SIGNUP,
	SET_SIGNUP,
	GET_FORGET_EMAIL,
	SET_FORGET_PASSWORD,
	GET_ONE_TIME_PASSWORD,
	SET_ONE_TIME_PASSWORD,
	GET_PASSWORD,
	SET_PASSWORD,
	GET_LOGOUT,
	SET_LOGOUT,
	GET_USER,
	SET_USER,
	GET_USERS,
	SET_USERS
} from '../constants/user';

function getLogin(userInputData, onSuccess, onFailure) {
	return {
		type: GET_LOGIN,
		payload: userInputData,
		onSuccess,
		onFailure
	};
}

function setLogin(userResponse) {
	console.log('see', userResponse);
	return {
		type: SET_LOGIN,
		payload: userResponse
	};
}

function getSignUp(userInputData, onSuccess, onFailure) {
	return {
		type: GET_SIGNUP,
		payload: userInputData,
		onSuccess,
		onFailure
	};
}

function setSignUp(userSignupResponse) {
	return {
		type: SET_SIGNUP,
		payload: userSignupResponse
	};
}

function getForgetEmail(userInputData, onSuccess, onFailure) {
	return {
		type: GET_FORGET_EMAIL,
		payload: userInputData,
		onSuccess,
		onFailure
	};
}

function setForgetPassword(resetPasswordResponse) {
	return {
		type: SET_FORGET_PASSWORD,
		payload: resetPasswordResponse
	};
}

function getOneTimePassword(userData, onSuccess, onFailure) {
	return {
		type: GET_ONE_TIME_PASSWORD,
		payload: userData,
		onSuccess,
		onFailure
	};
}

function setOneTimePassword(verifiedUserResponse) {
	return {
		type: SET_ONE_TIME_PASSWORD,
		payload: verifiedUserResponse
	};
}

function setPassword(resetPinResponse) {
	return {
		type: SET_PASSWORD,
		payload: resetPinResponse
	};
}

function getPassword(userInputData, onSuccess, onFailure) {
	return {
		type: GET_PASSWORD,
		payload: userInputData,
		onSuccess,
		onFailure
	};
}

function getLogOut(onSuccess, onFailure) {
	return {
		type: GET_LOGOUT,
		onSuccess,
		onFailure
	};
}

function setLogOut(logoutResponse) {
	return {
		type: SET_LOGOUT,
		payload: logoutResponse
	};
}

function getUser(onSuccess, onFailure) {
	return {
		type: GET_USER,
		onSuccess,
		onFailure
	};
}

function setUser(userResponse) {
	return {
		type: SET_USER,
		payload: userResponse
	};
}

function getUsers() {
	return {
		type: GET_USERS
	};
}

function setUsers(userList) {
	return {
		type: SET_USERS,
		payload: userList
	};
}

export {
	getLogin,
	setLogin,
	getSignUp,
	setSignUp,
	getForgetEmail,
	setForgetPassword,
	getOneTimePassword,
	setOneTimePassword,
	getPassword,
	setPassword,
	setLogOut,
	getLogOut,
	getUser,
	setUser,
	getUsers,
	setUsers
};
