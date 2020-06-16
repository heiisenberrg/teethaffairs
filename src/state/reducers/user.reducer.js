import constants from '../constants/user.constant';

const initialState = {
	access: '',
	email: '',
	first_name: '',
	last_name: '',
	id: '',
	is_verified: false,
	user_type: '',
	gender: '',
	profile_pic: null,
	zipcode: '',
	errorMessage: '',
	users: [],
	user: {},
	loading: false,
	deviceToken: '',
	notifications: []
};

function userReducer(state = initialState, action) {
	switch (action.type) {
		case constants.UPDATE_USER:
			return {
				...state,
				loading: true
			};
		case constants.UPDATE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					...action.response
				}
			};
		case constants.UPDATE_USER_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.SET_DEVICE_TOKEN:
			return {
				...state,
				deviceToken: action.token
			};
		case constants.GET_LOGIN:
			return {
				...state,
				loading: true
			};
		case constants.GET_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.response
			};
		case constants.GET_LOGIN_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_SIGNUP:
			return {
				...state,
				loading: true
			};
		case constants.GET_SIGNUP_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_SIGNUP_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_FORGET_EMAIL:
			return {
				...state,
				loading: true
			};
		case constants.GET_FORGET_EMAIL_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_FORGET_EMAIL_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_ONE_TIME_PASSWORD:
			return {
				...state,
				loading: true
			};
		case constants.GET_ONE_TIME_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_ONE_TIME_PASSWORD_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_PASSWORD:
			return {
				...state,
				loading: true
			};
		case constants.GET_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_PASSWORD_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_LOGOUT:
			return {
				...state,
				loading: true
			};
		case constants.GET_LOGOUT_SUCCESS:
			return {
				...state,
				loading: false,
				user: null,
				access: ''
			};
		case constants.GET_LOGOUT_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_USER:
			return {
				...state,
				loading: true
			};
		case constants.GET_USER_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_USER_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_USERS:
			return {
				...state,
				loading: true
			};
		case constants.GET_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.response
			};
		case constants.GET_USERS_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_MY_PROFILE:
			return {
				...state,
				loading: true
			};
		case constants.GET_MY_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				user: {
					...state.user,
					...action.response.data
				}
			};
		case constants.GET_MY_PROFILE_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.CLEAR_USER:
			return {
				...state,
				access: '',
				email: '',
				first_name: '',
				last_name: '',
				id: '',
				is_verified: false,
				user_type: '',
				gender: '',
				profile_pic: null,
				zipcode: '',
				errorMessage: '',
				users: [],
				user: {},
				loading: false,
				deviceToken: ''
			};
		case constants.SUBMIT_CONTACT_US:
			return {
				...state,
				loading: true
			};
		case constants.SUBMIT_CONTACT_US_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.SUBMIT_CONTACT_US_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.UPLOAD_PROFILE_PICTURE:
			return {
				...state,
				loading: true
			};
		case constants.UPLOAD_PROFILE_PICTURE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.UPLOAD_PROFILE_PICTURE_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_NOTIFICATIONS:
			return {
				...state,
				loading: true
			};
		case constants.GET_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				loading: false,
				notifications: action.response
			};
		case constants.GET_NOTIFICATIONS_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_CHECK_NAME:
			return {
				...state
			};
		case constants.GET_CHECK_NAME_SUCCESS:
			return {
				...state
			};
		case constants.GET_CHECK_NAME_FAILURE:
			return {
				...state
			};
		default:
			return state;
	}
}

export default userReducer;
