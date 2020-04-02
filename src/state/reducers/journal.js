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
	SET_NOTE_LIST
} from '../constants/journal';

const initialState = {
	usersList: [],
	notes: []
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

export default journalReducer;
