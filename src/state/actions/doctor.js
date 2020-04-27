import {
    GET_QUESTIONS,
	SET_QUESTIONS,
	ANSWER_QUESTION,
	REJECT_QUESTION,
	VERIFY_PIN,
	API_FAILURE,
	API_SUCCESS,
	UPDATE_DOCTOR_PROFILE
} from '../constants/doctor';

const getQuestions = (onSuccess, onFailure) => {
	return {
		type: GET_QUESTIONS,
		onSuccess,
		onFailure
	};
};

const setQuestions = (response) => {
	return {
        type: SET_QUESTIONS,
        payload: response
	};
};

const answerQuestion = (data, onSuccess, onFailure) => {
	return {
		type: ANSWER_QUESTION,
		data,
		onSuccess,
		onFailure
	};
};

const rejectQuestion = (data, onSuccess, onFailure) => {
	return {
		type: REJECT_QUESTION,
		data,
		onSuccess,
		onFailure
	};
};

const verifyPin = (data, onSuccess, onFailure) => {
	return {
		type: VERIFY_PIN,
		data,
		onSuccess,
		onFailure
	};
};

const apiFailure = () => {
	return {
		type: API_FAILURE
	};
};

const apiSuccess = () => {
	return {
		type: API_SUCCESS
	};
};

const updateDoctorProfile = (data, onSuccess, onFailure) => {
	return {
		type: UPDATE_DOCTOR_PROFILE,
		payload: data,
		onSuccess,
		onFailure 
	};
};

module.exports = {
    getQuestions,
	setQuestions,
	answerQuestion,
	rejectQuestion,
	verifyPin,
	apiFailure,
	apiSuccess,
	updateDoctorProfile
};