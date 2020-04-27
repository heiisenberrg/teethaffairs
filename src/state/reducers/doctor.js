import {
    GET_QUESTIONS,
    SET_QUESTIONS,
    ANSWER_QUESTION,
    REJECT_QUESTION,
    VERIFY_PIN,
    API_FAILURE,
    API_SUCCESS,
    UPDATE_DOCTOR_PROFILE
} from '../constants/doctor';

const initialState = {
    questions: []
};

function doctorReducer(state = initialState, action) {
	switch (action.type) {
		case GET_QUESTIONS:
			return {
                ...state
            };
        case SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            };
        case UPDATE_DOCTOR_PROFILE:
            return {
                ...state
            };
        case ANSWER_QUESTION:
            return {
                ...state
            };
        case REJECT_QUESTION:
            return {
                ...state
            };
        case VERIFY_PIN:
            return {
                ...state
            };
        case API_FAILURE:
            return {
                ...state
            };
        case API_SUCCESS:
            return {
                ...state
            };
		default:
			return state;
	}
}

export default doctorReducer;
