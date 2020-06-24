import { apiCall, uploadFile } from '../../utilities/axios-interceptor.js';
import {
	ADD_MEMBER,
	USER_LIST,
	USER_NOTES,
	USER_DEACTIVATE,
	NOTES,
	GET_USERNOTES,
	DOCTOR_LIST,
	DENTAL_VISIT,
	DENTAL_VISIT_BASE_URL,
	GET_REMOTE_CONSULTATION_FOR_PATIENTS,
	NOTE_EDIT
} from '../config';

export const getMember = (data) => 
	uploadFile({
		url: `${ADD_MEMBER}`,
		method: 'POST',
		headers: {
			Accept: 'application/json'
			// 'Content-Type': 'multipart/form-data'
		},
		data,
		withCredentials: true
	});
	// return uploadFile({
	// 	url: id === '' ? ADD_MEMBER : USER_LIST + id + '/',
	// 	method: id === '' ? 'POST' : 'PUT',
	// 	data,
	// 	headers: {
	// 	Accept: 'application/json',
	// 	'Content-Type': 'multipart/form-data'
	// 	},
	// 	withCredentials: true
	// });

export const getUsers = () =>
	apiCall({
		url: USER_LIST,
		method: 'GET',
		withCredentials: true
	});

export const getNotes = data =>
	apiCall({
		url: USER_NOTES,
		method: 'POST',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		withCredentials: true
	});

export const deactivateUser = data =>
	apiCall({
		url: USER_DEACTIVATE,
		method: 'PUT',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const getNoteList = data =>
	apiCall({
		url: `${GET_USERNOTES}`,
		method: 'GET',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const getDoctors = data =>
	apiCall({
		url: DOCTOR_LIST,
		method: 'GET',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const updateNotes = data =>
	apiCall({
		url: `${USER_NOTES}${data.userNoteId}/`,
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data'
		},
		data: data.data,
		withCredentials: true
	});

export const updateHealthHistory = data =>
	apiCall({
		url: `${NOTE_EDIT}${data.userNoteId}/note-edit/`,
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		data: data.data,
		withCredentials: true
	});

export const sendQuestions = data =>
	apiCall({
		url: `${NOTES}${data.userNoteId}/question-create/`,
		method: 'PUT',
		data: data.question_data,
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const dentalVisit = data =>
	apiCall({
		url: `${DENTAL_VISIT}`,
		method: 'GET',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const getRemoteConsultationsForPatient = data =>
	apiCall({
		url: `${GET_REMOTE_CONSULTATION_FOR_PATIENTS}`,
		method: 'GET',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const dentalVisitCreate = data => {
	return uploadFile({
		url: `${DENTAL_VISIT_BASE_URL}`,
		method: 'POST',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data'
		},
		withCredentials: true
	});
};

export const deleteNotes = data =>
	apiCall({
		url: NOTES + data + '/',
		method: 'DELETE',
		data,
		withCredentials: true
	});

export const createNote = data =>
	uploadFile({
		url: `${USER_NOTES}`,
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data'
		},
		data,
		withCredentials: true
	});

export const updateDentalVisit = (id, data) =>
	apiCall({
		url: `${DENTAL_VISIT_BASE_URL}${id}/`,
		method: 'PATCH',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data'
		},
		data,
		withCredentials: true
	});

export const removeDentalVisit = data =>
	apiCall({
		url: `${DENTAL_VISIT_BASE_URL}${data}/`,
		method: 'DELETE',
		withCredentials: true
	});

export const updateNote = (data, id) =>
	apiCall({
		url: `${USER_NOTES}${id}/`,
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data'
		},
		data: data,
		withCredentials: true
	});
