import constants from '../constants/payment.constant';

export const getCards = () => ({
	type: constants.GET_CARDS
});

export const getCardsSuccess = response => ({
	type: constants.GET_CARDS_SUCCESS,
	response
});

export const getCardsFailure = error => ({
	type: constants.GET_CARDS_FAILURE,
	error
});

export const createCard = (data) => ({
	type: constants.CREATE_CARD,
	data
});

export const createCardSuccess = response => ({
	type: constants.CREATE_CARD_SUCCESS,
	response
});

export const createCardFailure = error => ({
	type: constants.CREATE_CARD_FAILURE,
	error
});

export const upgradeApp = (data) => ({
	type: constants.UPGRADE_APP,
	data
});

export const upgradeAppSuccess = response => ({
	type: constants.UPGRADE_APP_SUCCESS,
	response
});

export const upgradeAppFailure = error => ({
	type: constants.UPGRADE_APP_FAILURE,
	error
});

export const clearPayment = () => ({
	type: constants.CLEAR_PAYMENT
});
