import constants from '../constants/journal.constant';

export const getAddMember = (data) => ({
	type: constants.GET_ADD_MEMBER,
	data
});

export const getAddMemberSuccess = response => ({
	type: constants.GET_ADD_MEMBER_SUCCESS,
	response
});

export const getAddMemberFailure = error => ({
	type: constants.GET_ADD_MEMBER_FAILURE,
	error
});

export const getUserList = () => ({
	type: constants.GET_USER_LIST
});

export const getUserListSuccess = response => ({
	type: constants.GET_USER_LIST_SUCCESS,
	response
});

export const getUserListFailure = error => ({
	type: constants.GET_USER_LIST_FAILURE,
	error
});

export const getUserNote = (data) => ({
	type: constants.GET_USER_NOTE,
	data
});

export const getUserNoteSuccess = response => ({
	type: constants.GET_USER_NOTE_SUCCESS,
	response
});

export const getUserNoteFailure = error => ({
	type: constants.GET_USER_NOTE_FAILURE,
	error
});

export const getDeactivateUserId = (data) => ({
	type: constants.GET_DEACTIVATE_USER_ID,
	data
});

export const getDeactivateUserIdSuccess = response => ({
	type: constants.GET_DEACTIVATE_USER_ID_SUCCESS,
	response
});

export const getDeactivateUserIdFailure = error => ({
	type: constants.GET_DEACTIVATE_USER_ID_FAILURE,
	error
});

export const fetchNotes = (data) => ({
	type: constants.GET_NOTE_LIST,
	data
});

export const fetchNotesSuccess = response => ({
	type: constants.GET_NOTE_LIST_SUCCESS,
	response
});

export const fetchNotesFailure = error => ({
	type: constants.GET_NOTE_LIST_FAILURE,
	error
});

export const getDoctorsList = (data) => ({
	type: constants.GET_DOCTORS_LIST,
	data
});

export const getDoctorsListSuccess = response => ({
	type: constants.GET_DOCTORS_LIST_SUCCESS,
	response
});

export const getDoctorsListFailure = error => ({
	type: constants.GET_DOCTORS_LIST_FAILURE,
	error
});

export const getQuestion = (data, onSuccess, onFailure) => ({
	type: constants.GET_QUESTION,
	data,
	onSuccess,
	onFailure
});

export const getQuestionSuccess = response => ({
	type: constants.GET_QUESTION_SUCCESS,
	response
});

export const getQuestionFailure = error => ({
	type: constants.GET_QUESTION_FAILURE,
	error
});

export const createUserNote = (data, onSuccess, onFailure) => ({
	type: constants.CREATE_USER_NOTE,
	data,
	onSuccess,
	onFailure
});

export const createUserNoteSuccess = response => ({
	type: constants.CREATE_USER_NOTE_SUCCESS,
	response
});

export const createUserNoteFailure = error => ({
	type: constants.CREATE_USER_NOTE_FAILURE,
	error
});

export const getDeleteNote = (data, onSuccess, onFailure) => ({
	type: constants.GET_DELETE_NOTE,
	data,
	onSuccess,
	onFailure
});

export const getDeleteNoteSuccess = response => ({
	type: constants.GET_DELETE_NOTE_SUCCESS,
	response
});

export const getDeleteNoteFailure = error => ({
	type: constants.GET_DELETE_NOTE_FAILURE,
	error
});

export const getDentalVisits = (data, onSuccess, onFailure) => ({
	type: constants.GET_DENTAL_VISITS,
	data,
	onSuccess,
	onFailure
});

export const getDentalVisitsSuccess = response => ({
	type: constants.GET_DENTAL_VISITS_SUCCESS,
	response
});

export const getDentalVisitsFailure = error => ({
	type: constants.GET_DENTAL_VISITS_FAILURE,
	error
});

export const createDentalVisits = (data, onSuccess, onFailure) => ({
	type: constants.CREATE_DENTAL_VISIT,
	data,
	onSuccess,
	onFailure
});

export const createDentalVisitsSuccess = response => ({
	type: constants.CREATE_DENTAL_VISIT_SUCCESS,
	response
});

export const createDentalVisitsFailure = error => ({
	type: constants.CREATE_DENTAL_VISIT_FAILURE,
	error
});

export const updateDentalVisit = (id, data, onSuccess, onFailure) => ({
	type: constants.SAVE_EDITED_DENTAL_VISIT,
	id,
	data,
	onSuccess,
	onFailure
});

export const updateDentalVisitSuccess = response => ({
	type: constants.SAVE_EDITED_DENTAL_VISIT_SUCCESS,
	response
});

export const updateDentalVisitFailure = error => ({
	type: constants.SAVE_EDITED_DENTAL_VISIT_FAILURE,
	error
});

export const deleteDentalVisit = (data) => ({
	type: constants.DELETE_DENTAL_VISIT,
	data
});

export const deleteDentalVisitSuccess = response => ({
	type: constants.DELETE_DENTAL_VISIT_SUCCESS,
	response
});

export const deleteDentalVisitFailure = error => ({
	type: constants.DELETE_DENTAL_VISIT_FAILURE,
	error
});

export const updateUserNote = (data) => ({
	type: constants.UPDATE_USER_NOTE,
	data
});

export const updateUserNoteSuccess = response => ({
	type: constants.UPDATE_USER_NOTE_SUCCESS,
	response
});

export const updateUserNoteFailure = error => ({
	type: constants.UPDATE_USER_NOTE_FAILURE,
	error
});

export const setDoctorDetail = data => ({
	type: constants.SET_DOCTOR,
	data
});
