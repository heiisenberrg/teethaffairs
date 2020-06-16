import constants from '../constants/journal.constant';

const initialState = {
	usersList: [],
	notes: [],
	doctor_zipcode: '',
	doctor: {},
	visits: [],
	patientRemoteConsultation: [],
	doctors_list: [],
	loading: false
};

function journalReducer(state = initialState, action) {
	switch (action.type) {
		case constants.GET_ADD_MEMBER:
			return {
				...state,
				loading: true
			};
		case constants.GET_ADD_MEMBER_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_ADD_MEMBER_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_USER_LIST:
			return {
				...state,
				loading: true
			};
		case constants.GET_USER_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				usersList: action.response
			};
		case constants.GET_USER_LIST_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_USER_NOTE:
			return {
				...state,
				loading: true
			};
		case constants.GET_USER_NOTE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_USER_NOTE_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_DEACTIVATE_USER_ID:
			return {
				...state,
				loading: true
			};
		case constants.GET_DEACTIVATE_USER_ID_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_DEACTIVATE_USER_ID_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_NOTE_LIST:
			return {
				...state,
				loading: true
			};
		case constants.GET_NOTE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				notes: action.response.data
			};
		case constants.GET_NOTE_LIST_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.CREATE_USER_NOTE:
			return {
				...state,
				loading: true
			};
		case constants.CREATE_USER_NOTE_SUCCESS:
			return {
				...state,
				loading: false,
				notes: action.response.data
			};
		case constants.CREATE_USER_NOTE_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_DOCTORS_LIST:
			return {
				...state,
				loading: true
			};
		case constants.GET_DOCTORS_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				doctors_list: action.response.data
			};
		case constants.GET_DOCTORS_LIST_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_QUESTION:
			return {
				...state,
				loading: true
			};
		case constants.GET_QUESTION_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_QUESTION_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_DOCTOR_DETAIL:
			return {
				...state,
				loading: true
			};
		case constants.GET_DOCTOR_DETAIL_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_DOCTOR_DETAIL_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_DELETE_NOTE:
			return {
				...state,
				loading: true
			};
		case constants.GET_DELETE_NOTE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.GET_DELETE_NOTE_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_DENTAL_VISITS:
			return {
				...state,
				loading: true
			};
		case constants.GET_DENTAL_VISITS_SUCCESS:
			return {
				...state,
				loading: false,
				visits: action.response.data
			};
		case constants.GET_DENTAL_VISITS_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_REMOTE_CONSULTATION_FOR_PATIENTS_SUCCESS:
			return {
				...state,
				loading: false,
				patientRemoteConsultation: action.response
			};
		case constants.GET_REMOTE_CONSULTATION_FOR_PATIENTS_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.GET_REMOTE_CONSULTATION_FOR_PATIENTS:
			return {
				...state,
				loading: true
			};
		case constants.CREATE_DENTAL_VISIT:
			return {
				...state,
				loading: true
			};
		case constants.CREATE_DENTAL_VISIT_SUCCESS:
			return {
				...state,
				loading: false,
				visits: [ action.response, ...state.visits ]
			};
		case constants.CREATE_DENTAL_VISIT_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.SAVE_EDITED_DENTAL_VISIT:
			return {
				...state,
				loading: true
			};
		case constants.SAVE_EDITED_DENTAL_VISIT_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.SAVE_EDITED_DENTAL_VISIT_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.DELETE_DENTAL_VISIT:
			return {
				...state,
				loading: true
			};
		case constants.DELETE_DENTAL_VISIT_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.DELETE_DENTAL_VISIT_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.UPDATE_USER_NOTE:
			return {
				...state,
				loading: true
			};
		case constants.UPDATE_USER_NOTE_SUCCESS:
			return {
				...state,
				loading: false
			};
		case constants.UPDATE_USER_NOTE_FAILURE:
			return {
				...state,
				loading: false
			};
		case constants.SET_DOCTOR:
			return {
				...state,
				doctor: action.data
			};
		case constants.CLEAR_JOURNAL:
			return {
				...state,
				usersList: [],
				notes: [],
				doctor_zipcode: '',
				doctor: {},
				visits: [],
				patientRemoteConsultation: [],
				doctors_list: [],
				loading: false
			};
		default:
			return state;
			break;
	}
}

export default journalReducer;
