import {
	GET_REMINDER_LIST,
	SET_REMINDER_LIST,
	UPDATE_REMINDER,
	DELETE_REMINDER,
	CREATE_REMINDER,
	SET_REMINDER,
	GET_REMINDER_LIST_BASED_ON_FILTER
} from '../constants/reminder';

const initialState = {
	reminderList: []
};

function reminderReducer(state = initialState, action) {
	switch (action.type) {
		case SET_REMINDER_LIST:
			return apply_setReminders(state, action);
		case GET_REMINDER_LIST:
			return apply_fetchReminders(state, action);
		case UPDATE_REMINDER:
			return apply_updateReminder(state, action);
		case DELETE_REMINDER:
			return apply_deleteReminder(state, action);
		case CREATE_REMINDER:
			return apply_createReminder(state, action);
		case SET_REMINDER:
			return apply_setReminderResponse(state, action);
		case GET_REMINDER_LIST_BASED_ON_FILTER:
			return apply_fetchRemindersBasedOnFilter(state, action);
		default:
			return state;
	}
}

function apply_fetchReminders(state) {
	let newState = { ...state };
	return newState;
}

function apply_setReminders(state, action) {
	let newState = { ...state };
	newState.reminderList = action.payload;
	return newState;
}

function apply_updateReminder(state) {
	let newState = { ...state };
	return newState;
}

function apply_deleteReminder(state) {
	let newState = { ...state };
	return newState;
}

function apply_createReminder(state) {
	let newState = { ...state };
	return newState;
}

function apply_setReminderResponse(state, action) {
	let newState = { ...state };
	newState.reminderList = [ ...action.payload, ...state.reminderList ];
	return newState;
}

function apply_fetchRemindersBasedOnFilter(state) {
	let newState = { ...state };
	return newState;
}

export default reminderReducer;
