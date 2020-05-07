import constants from '../constants/doctor.constant';

export const getQuestions = () => ({
	type: constants.GET_QUESTIONS
});

export const getQuestionsSuccess = response => ({
	type: constants.GET_QUESTIONS_SUCCESS,
	response
});

export const getQuestionsFailure = error => ({
	type: constants.GET_QUESTIONS_FAILURE,
	error
});

export const answerQuestion = data => ({
	type: constants.ANSWER_QUESTION,
	data
});

export const answerQuestionSuccess = response => ({
	type: constants.ANSWER_QUESTION_SUCCESS,
	response
});

export const answerQuestionFailure = error => ({
	type: constants.ANSWER_QUESTION_FAILURE,
	error
});

export const rejectQuestion = data => ({
	type: constants.REJECT_QUESTION,
	data
});

export const rejectQuestionSuccess = response => ({
	type: constants.REJECT_QUESTION_SUCCESS,
	response
});

export const rejectQuestionFailure = error => ({
	type: constants.REJECT_QUESTION_FAILURE,
	error
});

export const verifyPin = (data, onSuccess, onFailure) => ({
	type: constants.VERIFY_PIN,
	data,
	onSuccess,
	onFailure
});

export const verifyPinSuccess = response => ({
	type: constants.VERIFY_PIN_SUCCESS,
	response
});

export const verifyPinFailure = error => ({
	type: constants.VERIFY_PIN_FAILURE,
	error
});

export const updateDoctorProfile = data => ({
	type: constants.UPDATE_DOCTOR_PROFILE,
	data
});

export const updateDoctorProfileSuccess = response => ({
	type: constants.UPDATE_DOCTOR_PROFILE_SUCCESS,
	response
});

export const updateDoctorProfileFailure = error => ({
	type: constants.UPDATE_DOCTOR_PROFILE_FAILURE,
	error
});

export const clearDoctor = () => ({
	type: constants.CLEAR_DOCTOR
});
