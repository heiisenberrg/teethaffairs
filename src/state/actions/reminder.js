import {
	GET_REMINDER_LIST,
	SET_REMINDER_LIST,
	UPDATE_REMINDER,
	DELETE_REMINDER,
	CREATE_REMINDER,
	SET_REMINDER,
	GET_REMINDER_LIST_BASED_ON_FILTER
} from '../constants/reminder';

function fetchReminders() {
	return {
		type: GET_REMINDER_LIST
	};
}

function setReminders(reminderList) {
	return {
		type : SET_REMINDER_LIST,
		payload : reminderList
	};
}

function updateReminder(data, onSuccess, onFailure) {
	return {
		type: UPDATE_REMINDER,
		data,
		onSuccess,
		onFailure
	};
}

function deleteReminder(data, onSuccess, onFailure) {
	return {
		type: DELETE_REMINDER,
		data,
		onSuccess,
		onFailure
	};
}

function createReminder(data, onSuccess) {
	return {
		type: CREATE_REMINDER,
		data, 
		onSuccess
	};
}

function setReminderResponse(response) {
	return {
		type : SET_REMINDER,
		payload : response
	};
}

function fetchReminderBasedOnFilter(data) {
	return {
		type: GET_REMINDER_LIST_BASED_ON_FILTER,
		data
	};
}

export {
	fetchReminders,
	setReminders,
	updateReminder,
	deleteReminder,
	createReminder,
	setReminderResponse,
	fetchReminderBasedOnFilter
};
