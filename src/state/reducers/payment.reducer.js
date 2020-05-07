import constants from '../constants/payment.constant';

const initialState = {
	cards: [],
	loading: false
};

function paymentReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_CARDS:
			return {
				...state,
				loading: true
			};
		case constants.GET_CARDS_SUCCESS:
			return {
				...state,
				loading: false,
				cards: action.response.data
			};
		case constants.GET_CARDS_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.CREATE_CARD:
			return {
				...state,
				loading: true
			};
		case constants.CREATE_CARD_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.CREATE_CARD_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.UPGRADE_APP:
			return {
				...state,
				loading: true
			};
		case constants.UPGRADE_APP_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.UPGRADE_APP_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.CLEAR_PAYMENT:
			return {
				...state,
				...initialState
			};
		default:
			return state;
	}
}

export default paymentReducer;
