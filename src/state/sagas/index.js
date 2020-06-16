import { takeLatest, takeEvery } from 'redux-saga/effects';

import { constants } from '../constants';
import {
	fetchReminderList,
	createReminder,
	updateReminder,
	deleteReminder,
	fetchReminderListBasedOnFilter,
	getReminder,
	updateNotificationReminder
} from './reminder.saga';
import {
	getDentalQuestions,
	answerQuestions,
	rejectQuestions,
	verifySecretPin,
	updateDoctorProfile,
	getDentalHistoryQuestions
} from './doctor.saga';
import {
	fetchAddMember,
	fetchUserList,
	fetchNote,
	fetchUserDeactivateId,
	fetchNoteList,
	fetchDoctorList,
	getDentalVisits,
	getRemoteConsultationsForPatients,
	createDentalVisit,
	fetchDeleteNotes,
	createUserNote,
	editDentalVisit,
	deleteDentalVisit,
	updateUserNote,
	fetchSendQuestion
} from './journal.saga';

import {
	fetchLogin,
	fetchSignup,
	fetchVerifyEmail,
	fetchForgetPassword,
	fetchResetPin,
	fetchLogOut,
	fetchUser,
	updateUser,
	getUsers,
	getMyProfile,
	submitContactUsQuery,
	uploadProfilePicture,
	getNotifications,
	fetchCheckName
} from './user.saga';

import { getCards, createCard, upgradeApp } from './payment.saga';

import { getPatientHistory } from './history.saga';

export default function* saga() {
	// reminder
	yield takeLatest(constants.GET_REMINDER_LIST, fetchReminderList);
	yield takeLatest(constants.CREATE_REMINDER, createReminder);
	yield takeLatest(constants.UPDATE_REMINDER, updateReminder);
	yield takeLatest(constants.DELETE_REMINDER, deleteReminder);
	yield takeLatest(
		constants.GET_REMINDER_LIST_BASED_ON_FILTER,
		fetchReminderListBasedOnFilter
	);
	yield takeLatest(constants.GET_REMINDER, getReminder);
	yield takeLatest(
		constants.UPDATE_NOTIFICATION_REMINDER,
		updateNotificationReminder
	);

	//doctor
	yield takeLatest(constants.GET_QUESTIONS, getDentalQuestions);
	yield takeLatest(constants.ANSWER_QUESTION, answerQuestions);
	yield takeLatest(constants.REJECT_QUESTION, rejectQuestions);
	yield takeLatest(constants.VERIFY_PIN, verifySecretPin);
	yield takeLatest(constants.UPDATE_DOCTOR_PROFILE, updateDoctorProfile);
	yield takeLatest(constants.GET_HISTORY_QUESTIONS, getDentalHistoryQuestions);

	//journal
	yield takeLatest(constants.GET_ADD_MEMBER, fetchAddMember);
	yield takeLatest(constants.GET_USER_LIST, fetchUserList);
	yield takeLatest(constants.GET_USER_NOTE, fetchNote);
	yield takeLatest(constants.GET_DEACTIVATE_USER_ID, fetchUserDeactivateId);
	yield takeLatest(constants.GET_NOTE_LIST, fetchNoteList);
	yield takeLatest(constants.GET_DOCTORS_LIST, fetchDoctorList);
	yield takeLatest(constants.GET_QUESTION, fetchSendQuestion);
	yield takeLatest(constants.GET_DENTAL_VISITS, getDentalVisits);
	yield takeLatest(
		constants.GET_REMOTE_CONSULTATION_FOR_PATIENTS,
		getRemoteConsultationsForPatients
	);
	yield takeLatest(constants.CREATE_DENTAL_VISIT, createDentalVisit);
	yield takeLatest(constants.GET_DELETE_NOTE, fetchDeleteNotes);
	yield takeLatest(constants.SAVE_EDITED_DENTAL_VISIT, editDentalVisit);
	yield takeLatest(constants.DELETE_DENTAL_VISIT, deleteDentalVisit);
	yield takeLatest(constants.CREATE_USER_NOTE, createUserNote);
	yield takeLatest(constants.UPDATE_USER_NOTE, updateUserNote);

	//user
	yield takeLatest(constants.GET_LOGIN, fetchLogin);
	yield takeLatest(constants.GET_SIGNUP, fetchSignup);
	yield takeLatest(constants.GET_ONE_TIME_PASSWORD, fetchVerifyEmail);
	yield takeLatest(constants.GET_FORGET_EMAIL, fetchForgetPassword);
	yield takeLatest(constants.GET_PASSWORD, fetchResetPin);
	yield takeLatest(constants.GET_LOGOUT, fetchLogOut);
	yield takeLatest(constants.GET_USER, fetchUser);
	yield takeLatest(constants.UPDATE_USER, updateUser);
	yield takeLatest(constants.GET_USERS, getUsers);
	yield takeLatest(constants.GET_MY_PROFILE, getMyProfile);
	yield takeLatest(constants.SUBMIT_CONTACT_US, submitContactUsQuery);
	yield takeLatest(constants.UPLOAD_PROFILE_PICTURE, uploadProfilePicture);
	yield takeLatest(constants.GET_NOTIFICATIONS, getNotifications);
	yield takeEvery(constants.GET_CHECK_NAME, fetchCheckName);

	//payment
	yield takeLatest(constants.GET_CARDS, getCards);
	yield takeLatest(constants.CREATE_CARD, createCard);
	yield takeLatest(constants.UPGRADE_APP, upgradeApp);

	//history
	yield takeLatest(constants.GET_HISTORY, getPatientHistory);
}
