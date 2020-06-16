import constants from '../constants/reminder.constant';

export const fetchReminders = () => ({
	type: constants.GET_REMINDER_LIST
});

export const fetchRemindersSuccess = response => ({
	type: constants.GET_REMINDER_LIST_SUCCESS,
	response
});

export const fetchRemindersFailure = error => ({
	type: constants.GET_REMINDER_LIST_FAILURE,
	error
});

export const createReminder = data => ({
	type: constants.CREATE_REMINDER,
	data
});

export const createReminderSuccess = response => ({
	type: constants.CREATE_REMINDER_SUCCESS,
	response
});

export const createReminderFailure = error => ({
	type: constants.CREATE_REMINDER_FAILURE,
	error
});

export const updateReminder = data => ({
	type: constants.UPDATE_REMINDER,
	data
});

export const updateReminderSuccess = response => ({
	type: constants.UPDATE_REMINDER_SUCCESS,
	response
});

export const updateReminderFailure = error => ({
	type: constants.UPDATE_REMINDER_FAILURE,
	error
});

export const deleteReminder = (data, navigation) => ({
	type: constants.DELETE_REMINDER,
	data,
	navigation
});

export const deleteReminderSuccess = response => ({
	type: constants.DELETE_REMINDER_SUCCESS,
	response
});

export const deleteReminderFailure = error => ({
	type: constants.DELETE_REMINDER_FAILURE,
	error
});

export const fetchReminderBasedOnFilter = data => ({
	type: constants.GET_REMINDER_LIST_BASED_ON_FILTER,
	data
});

export const fetchReminderBasedOnFilterSuccess = response => ({
	type: constants.GET_REMINDER_LIST_BASED_ON_FILTER_SUCCESS,
	response
});

export const fetchReminderBasedOnFilterFailure = error => ({
	type: constants.GET_REMINDER_LIST_BASED_ON_FILTER_FAILURE,
	error
});

export const clearReminder = () => ({
	type: constants.CLEAR_REMINDER
});


export const getReminder = (data) => ({
	type: constants.GET_REMINDER,
	data
});

export const getReminderSuccess = response => ({
	type: constants.GET_REMINDER_SUCCESS,
	response
});

export const getReminderFailure = error => ({
	type: constants.GET_REMINDER_FAILURE,
	error
});