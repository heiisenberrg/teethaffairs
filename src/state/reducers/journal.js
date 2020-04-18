import {
	GET_ADD_MEMBER,
	SET_ADD_MEMBER,
	GET_USER_LIST,
	SET_USER_LIST,
	GET_USER_NOTE,
	SET_USER_NOTE,
	GET_DEACTIVATE_USER_ID,
	SET_DEACTIVATE_USER_ID,
	GET_NOTE_LIST,
	SET_NOTE_LIST,
	GET_DOCTORS_LIST,
	GET_DOCTOR_DETAIL,
	GET_DENTAL_VISITS,
	SET_DENTAL_VISITS,
	CREATE_DENTAL_VISIT,
	SET_CREATE_DENTAL_VISIT,
	SAVE_EDITED_DENTAL_VISIT,
	SET_SAVE_EDITED_DENTAL_VISIT,
	DELETE_DENTAL_VISIT,
	SET_DELETE_DENTAL_VISIT
} from '../constants/journal';

const initialState = {
	usersList: [],
	notes: [],
	doctor_zipcode: '',
	doctor:'',
	visits: []
};

function journalReducer(state = initialState, action) {
	switch (action.type) {
		case SET_ADD_MEMBER:
			return apply_setAddMember(state, action);
			break;
		case GET_ADD_MEMBER:
			return apply_getAddMember(state, action);
			break;
		case SET_USER_LIST:
			return apply_setUserList(state, action);
			break;
		case GET_USER_LIST:
			return apply_getUserList(state, action);
			break;
		case SET_USER_NOTE:
			return apply_setUserNote(state, action);
			break;
		case GET_USER_NOTE:
			return apply_getUserNote(state, action);
			break;
		case SET_DEACTIVATE_USER_ID:
			return apply_set_deactivate_user_id(state, action);
			break;
		case GET_DEACTIVATE_USER_ID:
			return apply_get_deactivate_user_id(state, action);
		case SET_NOTE_LIST:
			return apply_setNotes(state, action);
			break;
		case GET_NOTE_LIST:
			return apply_fetchNotes(state, action);
			break;
		case GET_DOCTORS_LIST:
			return apply_getDoctorsList(state, action);
			break;
		case GET_DOCTOR_DETAIL:
			return apply_getDoctorDetails(state, action);
			break;
			
		case SET_DENTAL_VISITS:
			return apply_setDentalVisits(state, action);
			break;
		case GET_DENTAL_VISITS:
			return apply_getDentalVisits(state, action);
			break;
		case CREATE_DENTAL_VISIT:
			return apply_createDentalVisit(state);
			break;
		case SET_CREATE_DENTAL_VISIT:
			return apply_setCreateDentalVisit(state, action);
			break;
		case SAVE_EDITED_DENTAL_VISIT:
			return apply_saveEditedDentalVisit(state);
			break;
		case SET_SAVE_EDITED_DENTAL_VISIT:
			return apply_setSaveEditedDentalVisit(state);
			break;
		case DELETE_DENTAL_VISIT:
			return apply_deleteDentalVisit(state);
			break;
		case SET_DELETE_DENTAL_VISIT:
			return apply_setDeleteDentalVisit(state);
			break;
		default:
			return state;
			break;
	}
}

function apply_getAddMember(state) {
	let newState = { ...state };
	return newState;
}

function apply_setAddMember(state, action) {
	let newState = { ...state, ...action.payload };
	return newState;
}

function apply_getUserList(state) {
	let newState = { ...state };
	return newState;
}

function apply_setUserList(state, action) {
	let newState = { ...state };

	newState.usersList = action.payload;
	return newState;
}

function apply_getUserNote(state) {
	let newState = { ...state };
	return newState;
}

function apply_setUserNote(state) {
	let newState = { ...state };
	return newState;
}

function apply_set_deactivate_user_id(state) {
	let newState = { ...state };
	return newState;
}

function apply_get_deactivate_user_id(state) {
	let newState = { ...state };
	return newState;
}

function apply_fetchNotes(state) {
	let newState = { ...state };
	return newState;
}

function apply_setNotes(state, action) {
	let newState = { ...state };
	newState.notes = action.payload;
	return newState;
}
function apply_getDoctorsList(state) {
	let newState = { ...state };
	return newState;
}
function apply_getDoctorDetails(state, action) {
	let newState = { ...state };
	newState.doctor_zipcode = action.payload.zipcode;
	newState.doctor = action.payload.id;
	return newState;
}

function apply_getDentalVisits(state) {
	let newState = { ...state };
	return newState;
}

function apply_setDentalVisits(state, action) {
	let newState = { ...state };
	newState.visits = action.payload;
	return newState;
}

function apply_createDentalVisit(state) {
	let newState = { ...state };
	return newState;
}

function apply_setCreateDentalVisit(state, action) {
	let newState = { ...state };
	newState.visits = [ action.payload, ...newState.visits ];
	return newState;
}

function apply_saveEditedDentalVisit(state) {
	let newState = { ...state };
	return newState;
}

function apply_setSaveEditedDentalVisit(state) {
	let newState = { ...state };
	return newState;
}

function apply_deleteDentalVisit(state) {
	let newState = { ...state };
	return newState;
}

function apply_setDeleteDentalVisit(state) {
	let newState = { ...state };
	return newState;
}

export default journalReducer;
