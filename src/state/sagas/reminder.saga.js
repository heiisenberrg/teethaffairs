import { call, put, select } from 'redux-saga/effects';
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
	fetchReminderBasedOnFilterFailure
} from '../actions/reminder';

import {
	view,
	create,
	remove,
	update,
	viewByFilter
} from '../services/reminder.service';
import FlashMessage from '../../components/global/FlashMessage';

const getRemindersList = state => state.reminder.reminderList;

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
		const reminderList = yield select(getRemindersList);
		const response = yield call(create, data);
		yield put(createReminderSuccess(response));
		yield put(fetchRemindersSuccess([ ...response.data, ...reminderList ]));
		data.navigation.goBack();
	} catch (e) {
		FlashMessage.message('Alert', 'Unable to create the reminder at the moment. Please try again later', 'red');
		yield put(createReminderFailure(e));
	}
}

export function* updateReminder(action) {
	const { data } = action;
	try {
		const reminderList = yield select(getRemindersList);
		const response = yield call(update, data);
		reminderList.splice(data.index, 1, response.data);
		yield put(updateReminderSuccess(response));
		yield put(fetchRemindersSuccess(reminderList));
		data.navigation.goBack();
	} catch (e) {
		FlashMessage.message('Alert', 'Unable to update the reminder at the moment, something went wrong.Please try again later', 'red');
		yield put(updateReminderFailure(e));
	}
}

export function* deleteReminder(action) {
	const { data } = action;
	try {
		const response = yield call(remove, data);
		yield put(fetchRemindersSuccess(data.data));
		yield put(deleteReminderSuccess(response));
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
