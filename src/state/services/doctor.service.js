import { apiCall } from '../../utilities/axios-interceptor.js';
import {
	DOCTOR_QUESTIONS_BASE_URL,
	VERIFY_PIN,
	UPDATE_DOCTOR_PROFILE,
	DOCTOR_HISTORY_QUESTIONS
} from '../config';

export const getDentalHistory = () =>
	apiCall({
		url: DOCTOR_HISTORY_QUESTIONS,
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const view = () =>
	apiCall({
		url: DOCTOR_QUESTIONS_BASE_URL,
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const respond = data =>
	apiCall({
		url: `${DOCTOR_QUESTIONS_BASE_URL}${data.id}/respond-question/`,
		method: 'POST',
		data: data.data,
		withCredentials: true
	});

export const reject = data =>
	apiCall({
		url: `${DOCTOR_QUESTIONS_BASE_URL}${data.id}/reject-question/`,
		method: 'POST',
		data: data.data,
		withCredentials: true
	});

export const pinVerify = data =>
	apiCall({
		url: VERIFY_PIN,
		method: 'GET',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const profileUpdate = data =>
	apiCall({
		url: UPDATE_DOCTOR_PROFILE,
		method: 'POST',
		data,
		withCredentials: true
	});
