import { apiCall } from '../../utilities/axios-interceptor.js';
import {
	GET_HISTORY
} from '../config';

export const getPatientHistories = data =>
	apiCall({
		url: GET_HISTORY,
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
        },
        data,
		withCredentials: true
	});