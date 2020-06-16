import { apiCall } from '../../utilities/axios-interceptor.js';
import { REMINDER_BASE_URL, GET_REMINDER_LIST_FILTER } from '../config';

export const view = () =>
	apiCall({
        url: REMINDER_BASE_URL,
        method: 'GET',
        withCredentials: true
    });

export const create = data =>
	apiCall({
        url: REMINDER_BASE_URL,
        method: 'POST',
        data: data.data,
        withCredentials: true
    });

export const remove = data =>
	apiCall({
        url: `${REMINDER_BASE_URL}${data.id}/`,
        method: 'DELETE',
        withCredentials: true
    });

export const update = data =>
	apiCall({
        url: `${REMINDER_BASE_URL}${data.id}/`,
        method: 'PATCH',
        headers: {
            Accept: 'application/json'
        },
        data: data.data,
        withCredentials: true
    });

export const viewByFilter = data =>
	apiCall({
        url: GET_REMINDER_LIST_FILTER,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        data,
        withCredentials: true
    });

export const get = data =>
	apiCall({
        url: `${REMINDER_BASE_URL}${data.id}/`,
        method: 'GET',
        withCredentials: true
    });
