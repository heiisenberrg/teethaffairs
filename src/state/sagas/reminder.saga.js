import { call, put } from 'redux-saga/effects';
import {
	fetchRemindersSuccess,
	fetchRemindersFailure,
	createReminderSuccess,
	createReminderFailure,
	updateReminderSuccess,
	updateReminderFailure,
	deleteReminderSuccess,
	deleteReminderFailure,
	fetchReminderBasedOnFilterSuccess,
	fetchReminderBasedOnFilterFailure,
	getReminderSuccess,
	getReminderFailure
} from '../actions/reminder';

import {
	view,
	create,
	remove,
	update,
	viewByFilter,
	get
} from '../services/reminder.service';
import FlashMessage from '../../components/global/FlashMessage';

export function* fetchReminderList() {
	try {
		const response = yield call(view);
		yield put(fetchRemindersSuccess(response.data));
	} catch (e) {
		yield put(fetchRemindersFailure(e));
	}
}

export function* createReminder(action) {
	const { data } = action;
	try {
		const response = yield call(create, data);
		yield put(createReminderSuccess(response));
		data.navigation.navigate('ListReminder', { refresh: true });
	} catch (e) {
		FlashMessage.message('Alert', 'Unable to create the reminder at the moment. Please try again later', 'red');
		yield put(createReminderFailure(e));
	}
}

export function* updateReminder(action) {
	const { data } = action;
	try {
		const response = yield call(update, data);
		yield put(updateReminderSuccess(response));
		if (data.navigation) {
			data.navigation.navigate('ListReminder', { refresh: true });
		}
	} catch (e) {
		FlashMessage.message('Alert', 'Unable to update the reminder at the moment, something went wrong.Please try again later', 'red');
		yield put(updateReminderFailure(e));
	}
}

export function* deleteReminder(action) {
	const { data, navigation } = action;
	try {
		const response = yield call(remove, data);
		yield put(deleteReminderSuccess(response));
		navigation.navigate('ListReminder', { refresh: true });
		FlashMessage.message('', 'Reminder deleted successfully', '#00C851');
	} catch (e) {
		yield put(deleteReminderFailure(e));
	}
}

export function* fetchReminderListBasedOnFilter(action) {
	const { data } = action;
	try {
		const response = yield call(viewByFilter, data);
		yield put(fetchReminderBasedOnFilterSuccess(response.data));
	} catch (e) {
		yield put(fetchReminderBasedOnFilterFailure(e));
	}
}

export function* getReminder(action) {
	const { data } = action;
	try {
		const response = yield call(get, data);
		yield put(getReminderSuccess(response));
	} catch (e) {
		yield put(getReminderFailure(e));
	}
}
