import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';

import { axiosInstance, getQueryParams } from '../../utilities/api-request';
import {  apiCall, uploadFile } from '../../utilities/axios-interceptor';

import {
	GET_ADD_MEMBER,
	GET_USER_LIST,
	GET_USER_NOTE,
	GET_DEACTIVATE_USER_ID,
	GET_NOTE_LIST,
	GET_DOCTORS_LIST,
	GET_QUESTION,
	GET_DOCTOR_DETAIL,
	GET_DENTAL_VISITS,
	CREATE_DENTAL_VISIT,
	GET_DELETE_NOTE,
	SAVE_EDITED_DENTAL_VISIT,
	DELETE_DENTAL_VISIT
} from '../constants/journal';
import {
	setAddMember,
	setUserList,
	setUserNote,
	setDeactivateUserId,
	setNotes,
	setQuestion,
	setDoctorDetail,
	setDentalVisits,
	setCreateDentalVisits,
	setDeleteNote,
	setUpdateDentalVisit,
	setDeleteDentalVisit
} from '../actions/journal';

const addMemberURL = '/users/user-registration/';
const userListURL = '/users/user/';
const userNoteURL = '/notes/patient-notes/';
const userDeactivateURL = '/users/deactivate-user/';
const notesURL = '/notes/notes/';
const doctorListURL = '/users/doctor-by-pin/?pincode=';
const dentalVisitsURL = '/visit/doctor-visits/';
const createDentalVisitsURL = '/visit/visits/';
const editDentalVisitsURL = '/visit/visits/';
const deleteDentalVisitsURL = '/visit/visits/';
const userNoteIdURL = '/notes/user-notes?user-id=';


function customAxios(payload) {
	return axiosInstance(payload);
}

function toAddMember(response, onSuccess) {
	return setAddMember(onSuccess(response));
}

function fetchAddMemberEpic(action$) {
	return action$.pipe(
		ofType(GET_ADD_MEMBER),
		mergeMap(fetchAddMember)
	);
}

function fetchAddMember(payload) {
	const { onFailure, onSuccess } = payload;
	const data = {
		...payload.payload
	};
	console.log('==========',data);
	return from(
		apiCall({
			url:
				payload.payload.id === ''
					? addMemberURL
					: userListURL + payload.payload.id + '/',
			method: payload.payload.id === '' ? 'POST' : 'PUT',
			data,
			withCredentials: true
		})
	).pipe(
		map(response => toAddMember(response.data, onSuccess)),
		catchError(error =>
			of({
				type: 'FETCH_ADD_MEMBER_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toUserList(response) {
	return setUserList(response);
}

function fetchUserListEpic(action$) {
	return action$.pipe(
		ofType(GET_USER_LIST),
		mergeMap(fetchUserList)
	);
}

function fetchUserList(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: userListURL,
			method: 'GET',
			withCredentials: true
		})
	).pipe(
		map(response => toUserList(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_USER_LIST_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toUserNote(response) {
	return setUserNote(response);
}

function fetchUserNoteEpic(action$) {
	return action$.pipe(
		ofType(GET_USER_NOTE),
		mergeMap(fetchNote)
	);
}

function fetchNote(payload) {
	const { onFailure } = payload;

	// const formData = Object.entries({ ...payload.payload })
	// 	.map(pair => `${pair[0]}=${pair[1]}`)
	// 	.join('&');

	// const data = {
	// 	formData,
	// 	publicRoute: false,
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	}
	// };

	return from(
		apiCall({
			url: userNoteURL,
			method: 'POST',
			data: { ...payload.payload },
			headers: { 
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded' 
			},
			withCredentials: true
		})
	).pipe(
		map(response => toUserNote(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_USER_NOTE_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toUserDeactivateId(response) {
	return setDeactivateUserId(response);
}

function fetchUserDeactivateIdEpic(action$) {
	return action$.pipe(
		ofType(GET_DEACTIVATE_USER_ID),
		mergeMap(fetchUserDeactivateId)
	);
}

function fetchUserDeactivateId(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: userDeactivateURL,
			method: 'PUT',
			data: { ...payload.payload },
			headers: { 
				Accept: 'application/json',
				'Content-Type': 'application/json' 
			},
			withCredentials: true
		})
	).pipe(
		map(response => toUserDeactivateId(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_USER_DEACTIVATE_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toNotes(response) {
	return setNotes(response);
}

function fetchNotesEpic(action$) {
	return action$.pipe(
		ofType(GET_NOTE_LIST),
		mergeMap(fetchNoteList)
	);
}

function fetchNoteList(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: payload.payload === '' ? notesURL : userNoteIdURL+payload.payload,
			method: 'GET',
			withCredentials: true
		})
	).pipe(
		map(response => toNotes(response.data)),
		catchError(error => {
			return of({
				type: 'FETCH_NOTES_LIST_FAILURE',
				payload: onFailure(error.response)
			});
		})
	);
}

function toDoctorList(response) {
	return setUserList(response);
}

function fetchDoctorListEpic(action$) {
	return action$.pipe(
		ofType(GET_DOCTORS_LIST),
		mergeMap(fetchDoctorList)
	);
}

function fetchDoctorList(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: `${doctorListURL}${payload.payload}`,
			method: 'GET',
			withCredentials: true
		})
	).pipe(
		map(response => toDoctorList(response.data)),
		catchError(error =>
			of({
				type: 'FETCH_DOCTOR_LIST_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function toUserNoteUpdate(response, onSuccess) {
	return setQuestion(onSuccess(response));
}

function fetchUserNoteUpdateEpic(action$) {
	return action$.pipe(
		ofType(GET_QUESTION),
		mergeMap(fetchNoteUpdate)
	);
}

function fetchNoteUpdate(payload) {
	const { onSuccess, onFailure, userNoteId } = payload;
	const formData = Object.entries({ ...payload.payload })
		.map(pair => `${pair[0]}=${pair[1]}`)
		.join('&');

	// const formData1 = Object.entries({ ...payload.payload1 })
	// 	.map(pair => `${pair[0]}=${pair[1]}`)
	// 	.join('&');

	const data = {
		formData,
		publicRoute: false,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	return from(
		customAxios({
			url: userNoteURL + userNoteId + '/',
			method: 'PUT',
			data
		})
	).pipe(
		() =>
			fetchSendQuestion(payload, onSuccess, onFailure, userNoteId),
		catchError(error =>
			of({
				type: 'FETCH_USER_NOTE_FAILURE',
				payload: onFailure(error.response)
			})
			)
		);
	}

	function fetchSendQuestion(payload, onSuccess, onFailure, userNoteId) {
		const data = {
			...payload.payload1
		};
		return from(
			apiCall({
				url: notesURL + userNoteId + '/question-create/',
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				data,
				withCredentials: true
			})
		).pipe(
			map(response => toUserNoteUpdate(response.data, onSuccess)),
			catchError(error =>
				of({
					type: 'FETCH_SEND_QUESTION_FAILURE',
					payload: onFailure(error.response)
				})
			)
		);
	}
	
	
function toDentalVisits(response) {
	return setDentalVisits(response);
}

function fetchDentalVisitsEpic(action$) {
	return action$.pipe(
		ofType(GET_DENTAL_VISITS),
		mergeMap(getDentalVisits)
	);
}

function getDentalVisits(payload) {
	const { onFailure } = payload;
	const options = {
		user_id: payload.payload.userId
	};
	return from(
		apiCall({
			url: `${dentalVisitsURL}${getQueryParams(options)}`,
			method: 'GET',
			withCredentials: true
		})
	).pipe(
			map(response => toDentalVisits(response.data)),
			catchError(error => {
				return of({
					type: 'GET_DENTAL_VISITS_LIST_FAILURE',
					payload: onFailure(error)
				});
			})
		);
	}
	


function toCreateDentalVisit(response, onSuccess) {
	onSuccess(response);
	return setCreateDentalVisits(response);
}

function createDentalVisitEpic(action$) {
	return action$.pipe(
		ofType(CREATE_DENTAL_VISIT),
		mergeMap(createDentalVisit)
	);
}

function createDentalVisit(payload) {
	const { onSuccess, onFailure } = payload;
	return from(
		uploadFile({
			url: `${createDentalVisitsURL}`,
			method: 'POST',
			data: payload.payload.data,
			headerConfig: { 
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data'
			}
		})
	).pipe(
		map(response => toCreateDentalVisit(response, onSuccess)),
		catchError(error =>
			of({
				type: 'CREATE_DENTAL_VISIT_FAILURE',
				payload: onFailure(error)

			})
			)
		);
	}



function toDeleteNote(onSuccess, response) {
	return setDeleteNote(onSuccess(response));
}

function fetchDeleteNoteEpic(action$) {
	return action$.pipe(
		ofType(GET_DELETE_NOTE),
		mergeMap(fetchDeleteMember)
	);
}

function fetchDeleteMember(payload) {
	const { onFailure, onSuccess } = payload;
	const data = {
		publicRoute: false,
		headers: {}
	};

	return from(
		customAxios({
			url: notesURL + payload.payload + '/',
			method: 'DELETE',
			data
		})
	).pipe(
		map(response => toDeleteNote(onSuccess, response)),
		catchError(error =>
			of({
				type: 'FETCH_DELETE_NOTE_FAILURE',
				payload: onFailure(error.response)
			})
		)
	);
}

function fetchDoctorDetailEpic(action$) {
	return action$.pipe(
		ofType(GET_DOCTOR_DETAIL),
		mergeMap(fetchDoctorDetail)
	);
}

function fetchDoctorDetail(payload) {
	return of({
		type: 'SET_DOCTOR_DETAIL',
		payload: setDoctorDetail(payload)
	});
}


function toEditDentalVisit(response, onSuccess) {
	onSuccess(response);
	return setUpdateDentalVisit(response);
}

function editSavedDentalVisitEpic(action$) {
	return action$.pipe(ofType(SAVE_EDITED_DENTAL_VISIT), mergeMap(editDentalVisit));
}

function editDentalVisit(payload) {
	const { onSuccess, onFailure } = payload;

	return from(
		apiCall({
			url: `${editDentalVisitsURL}${payload.payload.id}/`,
			method: 'PATCH',
			headers: { 
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data' 
			},
			data: payload.payload.data
		})
	).pipe(
		map(response => toEditDentalVisit(response.data, onSuccess)),
		catchError(error =>
			of({
				type: 'SAVE_EDITED_DENTAL_VISIT_FAILURE',
				payload: onFailure(error)
			})
		)
	);
}

function toDeleteDentalVisit(response) {
	return setDeleteDentalVisit(response);
}

function deleteDentalVisitEpic(action$) {
	return action$.pipe(ofType(DELETE_DENTAL_VISIT), mergeMap(deleteDentalVisit));
}

function deleteDentalVisit(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: `${deleteDentalVisitsURL}${payload.id}/`,
			method: 'DELETE',
			withCredentials: true
		})
	).pipe(
		map(response => toDeleteDentalVisit(response.data)),
		catchError(error =>
			of({
				type: 'DELETE_DENTAL_VISIT_FAILURE',
				payload: onFailure(error)
			})
		)
	);
}

export { 
	fetchAddMemberEpic, 
	fetchUserListEpic, 
	fetchUserNoteEpic, 
	fetchNotesEpic, 
	fetchUserDeactivateIdEpic, 
	fetchDentalVisitsEpic,
	createDentalVisitEpic,
	editSavedDentalVisitEpic,
	deleteDentalVisitEpic,
	fetchUserNoteUpdateEpic,
	fetchDoctorListEpic,
	fetchDoctorDetailEpic,
	fetchDeleteNoteEpic
};
