import {
	GET_ADD_MEMBER,
	SET_ADD_MEMBER,
	GET_USER_LIST,
	SET_USER_LIST,
	SET_USER_NOTE,
	GET_USER_NOTE,
	GET_DEACTIVATE_USER_ID,
	SET_DEACTIVATE_USER_ID,
	GET_NOTE_LIST,
	SET_NOTE_LIST,
	GET_DELETE_NOTE,
	SET_DELETE_NOTE,
	GET_DENTAL_VISITS,
	SET_DENTAL_VISITS,
	CREATE_DENTAL_VISIT,
	SET_CREATE_DENTAL_VISIT
} from '../constants/journal';

function getAddMember(userInputData, onFailure, onSuccess) {
	return {
		type: GET_ADD_MEMBER,
		payload: userInputData,
		onFailure,
		onSuccess
	};
}

function setAddMember(AddMembersResponse) {
	return {
		type: SET_ADD_MEMBER,
		payload: AddMembersResponse
	};
}

function getUserList(onFailure) {
	return {
		type: GET_USER_LIST,
		onFailure
	};
}

function setUserList(userList) {
	return {
		type: SET_USER_LIST,
		payload: userList
	};
}

function setUserNote(userNote) {
	return {
		type: SET_USER_NOTE,
		payload: userNote
	};
}

function getUserNote(userQueries, onFailure) {
	return {
		type: GET_USER_NOTE,
		payload: userQueries,
		onFailure
	};
}

function getDeactivateUserId(userDeactivateId, onFailure) {
	return {
		type: GET_DEACTIVATE_USER_ID,
		payload: userDeactivateId,
		onFailure
	};
}

function setDeactivateUserId(DeactivatedUser) {
	return {
		type: SET_DEACTIVATE_USER_ID,
		payload: DeactivatedUser
	};
}

function setNotes(notesList) {
	return {
		type : SET_NOTE_LIST,
		payload : notesList
	};
}

function fetchNotes(onSuccess, onFailure) {
	return {
		type: GET_NOTE_LIST,
		onSuccess,
		onFailure
	};
}

function getDeleteNote(noteId, onSuccess, onFailure ) {
	return {
		type: GET_DELETE_NOTE,
		payload: noteId,
		onSuccess,
		onFailure
	};
}

function setDeleteNote(deleteNoteResponse) {
	return {
		type: SET_DELETE_NOTE,
		payload: deleteNoteResponse
	};
}

function setDentalVisits(dentalVisits) {
	return {
		type : SET_DENTAL_VISITS,
		payload : dentalVisits
	};
}

function getDentalVisits(userId, onSuccess, onFailure) {
	return {
		type: GET_DENTAL_VISITS,
		payload: {
			userId
		},
		onSuccess,
		onFailure
	};
}

function createDentalVisits(payload, onSuccess, onFailure) {
	return {
		type: CREATE_DENTAL_VISIT,
		payload,
		onSuccess,
		onFailure
	};
}

function setCreateDentalVisits(dentalVisitResponse) {
	return {
		type: SET_CREATE_DENTAL_VISIT,
		payload: dentalVisitResponse
	};
}

export {
	getAddMember,
	setAddMember,
	getUserList,
	setUserList,
	setUserNote,
	getUserNote,
	setDeactivateUserId,
	getDeactivateUserId,
	setNotes,
	fetchNotes,
	getDeleteNote,
	setDeleteNote,
	setDentalVisits,
	getDentalVisits,
	createDentalVisits,
	setCreateDentalVisits
};
