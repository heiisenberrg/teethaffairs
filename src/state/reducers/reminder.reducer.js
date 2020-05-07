import constants from '../constants/reminder.constant';

const initialState = {
	reminderList: [],
	loading: false
};

function reminderReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_REMINDER_LIST:
			return {
				...state,
				loading: true
			};
		case constants.GET_REMINDER_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				reminderList: action.response
			};
		case constants.GET_REMINDER_LIST_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.CREATE_REMINDER:
			return {
				...state,
				loading: true
			};
		case constants.CREATE_REMINDER_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.CREATE_REMINDER_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.UPDATE_REMINDER:
			return {
				...state,
				loading: true
			};
		case constants.UPDATE_REMINDER_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.UPDATE_REMINDER_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.DELETE_REMINDER:
			return {
				...state,
				loading: true
			};
		case constants.DELETE_REMINDER_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.DELETE_REMINDER_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_REMINDER_LIST_BASED_ON_FILTER:
			return {
				...state,
				loading: true
			};
		case constants.GET_REMINDER_LIST_BASED_ON_FILTER_SUCCESS:
			return {
				...state,
				loading: false,
				reminderList: action.response
			};
		case constants.GET_REMINDER_LIST_BASED_ON_FILTER_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.CLEAR_REMINDER:
			return {
				...state,
				...initialState
			};
		default:
			return state;
	}
}

export default reminderReducer;
