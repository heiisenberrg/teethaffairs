import { apiCall } from '../../utilities/axios-interceptor.js';
import {
	GET_CARDS,
	CREATE_CARD,
	UPGRADE_APP
} from '../config';

export const getCustomerCards = () =>
	apiCall({
		url: GET_CARDS,
		method: 'GET',
		withCredentials: true
	});

export const createCards = (data) =>
	apiCall({
		url: CREATE_CARD,
		method: 'POST',
		data,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

export const pay = (data) =>
	apiCall({
		url: UPGRADE_APP,
		method: 'POST',
		data,
		withCredentials: true
	});