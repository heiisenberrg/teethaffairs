import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';

import { axiosInstance } from '../../utilities/api-request';
import {
	GET_ADD_MEMBER,
	GET_USER_LIST,
	GET_USER_NOTE,
	GET_DEACTIVATE_USER_ID
} from '../constants/journal';
import {
	setAddMember,
	setUserList,
	setUserNote,
	setDeactivateUserId
} from '../actions/journal';

const addMemberURL = '/users/user-registration/';
const userListURL = '/users/user/';
const userNoteURL = '/notes/patient-notes/';
const userDeactivateURL = '/users/deactivate-user/';

function customAxios(payload) {
	return axiosInstance(payload);
}

function toAddMember(response) {
	return setAddMember(response);
}

function fetchAddMemberEpic(action$) {
	return action$.pipe(ofType(GET_ADD_MEMBER), mergeMap(fetchAddMember));
}

function fetchAddMember(payload) {
	const { onFailure } = payload;
	const data = {
		...payload.payload,
		publicRoute: false,
		headers: {}
	};

	return from(
		customAxios({
			url:
				payload.payload.id === ''
					? addMemberURL
					: userListURL + payload.payload.id + '/',
			method: payload.payload.id === '' ? 'POST' : 'PUT',
			data
		})
	).pipe(
		map(response => toAddMember(response.data)),
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
	return action$.pipe(ofType(GET_USER_LIST), mergeMap(fetchUserList));
}

function fetchUserList(payload) {
	const { onFailure } = payload;
	const data = {
		publicRoute: false,
		headers: {}
	};

	return from(
		customAxios({
			url: userListURL,
			method: 'GET',
			data
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
	return action$.pipe(ofType(GET_USER_NOTE), mergeMap(fetchNote));
}

function fetchNote(payload) {
	const { onFailure } = payload;

	const formData = Object.entries({ ...payload.payload })
		.map(pair => `${pair[0]}=${pair[1]}`)
		.join('&');

	const data = {
		formData,
		publicRoute: false,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	};

	return from(
		customAxios({
			url: userNoteURL,
			method: 'POST',
			data
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
	const data = {
		...payload.payload,
		publicRoute: false,
		headers: {}
	};

	return from(
		customAxios({
			url: userDeactivateURL,
			method: 'PUT',
			data
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

export {
	fetchAddMemberEpic,
	fetchUserListEpic,
	fetchUserNoteEpic,
	fetchUserDeactivateIdEpic
};
