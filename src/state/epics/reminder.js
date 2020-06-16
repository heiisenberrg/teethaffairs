import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';

import { apiCall } from '../../utilities/axios-interceptor.js';
import { GET_REMINDER_LIST, UPDATE_REMINDER, DELETE_REMINDER, CREATE_REMINDER, GET_REMINDER_LIST_BASED_ON_FILTER } from '../constants/reminder';
import { setReminders, setReminderResponse } from '../actions/reminder';

const reminderListURL = '/reminders/reminder/';
const updateReminderById = '/reminders/reminder';
const createReminderURL = '/reminders/reminder/';
const reminderListBasedOnFilter = '/reminders/reminder-by-user/';

function toReminderList(response) {
	return setReminders(response);
}

function fetchReminderListEpic(action$) {
	return action$.pipe(ofType(GET_REMINDER_LIST), mergeMap(fetchReminderList));
}


function fetchReminderList(payload) {
	const { onFailure } = payload;
	return from(
		apiCall({
			url: reminderListURL,
			method: 'GET',
			withCredentials: true
		})
	).pipe(
		map(response => toReminderList(response.data)),
		catchError(error => {
			return of({
				type: 'GET_REMINDER_LIST_FAILURE',
				payload: onFailure(error.response)
			});
		})
	);
}

function toUpdateReminder(response, data, onSuccess) {
	let list = [ ...data.reminderList ];
	list.splice(data.index, 1, response);
	onSuccess();
	return setReminders(list);
}

function updateReminderEpic(action$) {
	return action$.pipe(ofType(UPDATE_REMINDER), mergeMap(updateReminder));
}


function updateReminder(payload) {
	const { onFailure, onSuccess, data } = payload;

	return from(
		apiCall({
			url: `${updateReminderById}/${data.id}/`,
			method: 'PATCH',
			headers: {
				Accept: 'application/json'
			},
			data: data.data,
			withCredentials: true
		})
	).pipe(
		map(response => toUpdateReminder(response.data, data, onSuccess)),
		catchError(error => {
			return of({
				type: 'GET_REMINDER_LIST_FAILURE',
				payload: onFailure(error.response)
			});
		})
	);
}

function toDeleteReminder(response) {
	return setReminders(response);
}

function deleteReminderEpic(action$) {
	return action$.pipe(ofType(DELETE_REMINDER), mergeMap(deleteReminder));
}


function deleteReminder(payload) {
	const { data } = payload;

	return from(
		apiCall({
			url: `${updateReminderById}/${data.id}/`,
			method: 'DELETE',
			withCredentials: true
		})
	).pipe(
		map(() => toDeleteReminder(data.data)),
		catchError(error => {
			return of({
				type: 'GET_REMINDER_LIST_FAILURE',
				payload: error.response
			});
		})
	);
}

function toCreateReminder(response, onSuccess) {
	let data = response;
	onSuccess();
	return setReminderResponse(data);
}

function createReminderEpic(action$) {
	return action$.pipe(ofType(CREATE_REMINDER), mergeMap(createReminder));
}


function createReminder(payload) {
	const { data, onSuccess } = payload;
	return from(
		apiCall({
			url: createReminderURL,
			method: 'POST',
			data: data.data,
			withCredentials: true
		})
	).pipe(
		map(response => toCreateReminder(response.data, onSuccess)),
		catchError(error => {
			return of({
				type: 'GET_REMINDER_LIST_FAILURE',
				payload: error.response
			});
		})
	);
}

function toReminderListBasedOnFilter(response) {
	return setReminders(response);
}

function fetchReminderListBasedOnFilterEpic(action$) {
	return action$.pipe(ofType(GET_REMINDER_LIST_BASED_ON_FILTER), mergeMap(fetchReminderListBasedOnFilter));
}


function fetchReminderListBasedOnFilter(payload) {
	const { onFailure, data } = payload;
	return from(
		apiCall({
			url: reminderListBasedOnFilter,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			data,
			withCredentials: true
		})
	).pipe(
		map(response => toReminderListBasedOnFilter(response.data)),
		catchError(error => {
			return of({
				type: 'GET_REMINDER_LIST_FAILURE',
				payload: onFailure(error.response)
			});
		})
	);
}


export { fetchReminderListEpic, updateReminderEpic, deleteReminderEpic, createReminderEpic, fetchReminderListBasedOnFilterEpic };
