import constants from '../constants/doctor.constant';

const initialState = {
	questions: [],
	historyQuestions: {
		answered: [],
		rejected: []
	},
	loading: false
};

var answered;
var rejected;

const parseHistoryQuestions = (data) => {
	answered = [];
	rejected = [];

	answered = data.filter(datum => datum.answered === true);
	rejected = data.filter(datum => datum.rejected === true);
	return {
		answered: answered,
		rejected: rejected
	};
};

function doctorReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_HISTORY_QUESTIONS:
			return {
				...state,
				loading: true
			};
		case constants.GET_HISTORY_QUESTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				historyQuestions: parseHistoryQuestions(action.response.data)
			};
		case constants.GET_HISTORY_QUESTIONS_FAILURE:
			return {
				...state,
				loading: false
			};
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
		case constants.CLEAR_DOCTOR:
			return {
				...state,
				questions: [],
				loading: false
			};
		default:
			return state;
	}
}

export default doctorReducer;
