import constants from '../constants/history.constant';

export const getHistory = (data) => ({
    type: constants.GET_HISTORY,
    data
});

export const getHistorySuccess = response => ({
	type: constants.GET_HISTORY_SUCCESS,
	response
});

export const getHistoryFailure = error => ({
	type: constants.GET_HISTORY_FAILURE,
	error
});

export const clearHistory = () => ({
	type: constants.CLEAR_HISTORY
});
