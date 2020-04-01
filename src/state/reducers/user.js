import {
	SET_LOGIN,
	GET_LOGIN,
	SET_SIGNUP,
	GET_SIGNUP,
	SET_ONE_TIME_PASSWORD,
	GET_ONE_TIME_PASSWORD,
	SET_FORGET_PASSWORD,
	GET_FORGET_EMAIL,
	SET_PASSWORD,
	GET_PASSWORD,
	SET_LOGOUT,
	GET_LOGOUT
} from '../constants/user';

const initialState = {
	access: '',
	email: '',
	first_name: '',
	last_name: '',
	id: '',
	is_verified: false,
	user_type: '',
	gender: '',
	profile_pic: '',
	zipcode: '',
	errorMessage: ''
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case SET_LOGIN:
			return apply_setLogin(state, action);
			break;
		case GET_LOGIN:
			return apply_getLogin(state, action);
			break;
		case GET_SIGNUP:
			return apply_getSignup(state, action);
			break;
		case SET_SIGNUP:
			return apply_setSignup(state, action);
			break;
		case GET_ONE_TIME_PASSWORD:
			return apply_getOtp(state, action);
			break;
		case SET_ONE_TIME_PASSWORD:
			return apply_setOtp(state, action);
			break;
		case GET_FORGET_EMAIL:
			return apply_getForgetEmail(state, action);
			break;
		case SET_FORGET_PASSWORD:
			return apply_setForgetPassword(state, action);
			break;
		case GET_PASSWORD:
			return apply_getPassword(state, action);
			break;
		case SET_PASSWORD:
			return apply_setPassword(state, action);
			break;
		case SET_LOGOUT:
			return apply_setLogOut(state, action);
			break;
		case GET_LOGOUT:
			return apply_getLogOut(state, action);
			break;
		default:
			return state;
			break;
	}
}

function apply_getLogin(state) {
	let newState = { ...state };
	return newState;
}

function apply_setLogin(state, action) {
	let newState = { ...state, ...action.payload };
	return newState;
}

function apply_getSignup(state) {
	let newState = { ...state };
	return newState;
}

function apply_setSignup(state, action) {
	let newState = { ...state, ...action.payload };
	return newState;
}

function apply_getOtp(state) {
	let newState = { ...state };
	return newState;
}

function apply_setOtp(state, action) {
	let newState = { ...state, ...action.payload };
	return newState;
}

function apply_getForgetEmail(state) {
	let newState = { ...state };
	return newState;
}

function apply_setForgetPassword(state, action) {
	let newState = { ...state, ...action.payload };
	return newState;
}

function apply_getPassword(state) {
	let newState = { ...state };
	return newState;
}

function apply_setPassword(state, action) {
	let newState = { ...state, ...action.payload };
	return newState;
}

function apply_getLogOut(state) {
	let newState = { ...state };
	return newState;
}

function apply_setLogOut(state) {
	let newState = { ...state };

	newState.is_verified = false;
	return newState;
}

export default userReducer;
