import constants from '../constants/history.constant';

const initialState = {
	histories: [],
	loading: false
};

function historyReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_HISTORY:
			return {
				...state,
				loading: true
			};
		case constants.GET_HISTORY_SUCCESS:
			return {
				...state,
				loading: false,
				histories: action.response.data
			};
		case constants.GET_HISTORY_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.CLEAR_HISTORY:
			return {
				...state,
				histories: [],
				loading: false
			};
		default:
			return state;
	}
}

export default historyReducer;
