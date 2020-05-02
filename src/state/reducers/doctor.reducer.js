import constants from '../constants/doctor.constant';

const initialState = {
	questions: [],
	loading: false
};

function doctorReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_QUESTIONS:
			return {
				...state,
				loading: true
			};
		case constants.GET_QUESTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				questions: action.response.data
			};
		case constants.GET_QUESTIONS_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.UPDATE_DOCTOR_PROFILE:
			return {
				...state,
				loading: true
			};
		case constants.UPDATE_DOCTOR_PROFILE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.UPDATE_DOCTOR_PROFILE_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.ANSWER_QUESTION:
			return {
				...state,
				loading: true
			};
		case constants.ANSWER_QUESTION_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.ANSWER_QUESTION_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.REJECT_QUESTION:
			return {
				...state,
				loading: true
			};
		case constants.REJECT_QUESTION_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.REJECT_QUESTION_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.VERIFY_PIN:
			return {
				...state,
				loading: true
			};
		case constants.VERIFY_PIN_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.VERIFY_PIN_FAILURE:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
}

export default doctorReducer;
