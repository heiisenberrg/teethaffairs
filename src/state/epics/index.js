import { combineEpics } from 'redux-observable';

import {
	fetchLoginEpic,
	fetchSignUpEpic,
	fetchForgetPasswordEpic,
	fetchEmailVerifyEpic,
	fetchResetPinEpic,
	fetchLogOutEpic,
	getUserEpic,
	updateUserEpic,
	getUsersEpic,
	getMyProfileEpic
} from './user';

import {
	fetchAddMemberEpic,
	fetchUserListEpic,
	fetchUserNoteEpic,
	fetchUserDeactivateIdEpic,
	fetchNotesEpic,
	fetchDoctorListEpic,
	fetchUserNoteUpdateEpic,
	fetchDoctorDetailEpic,
	fetchDeleteNoteEpic,
	fetchDentalVisitsEpic,
	createDentalVisitEpic,
	editSavedDentalVisitEpic,
	deleteDentalVisitEpic
} from './journal';

import { fetchReminderListEpic, updateReminderEpic, deleteReminderEpic, createReminderEpic, fetchReminderListBasedOnFilterEpic } from './reminder';

import { 
	fetchDentalQuestionsEpic, 
	answerQuestionsEpic, 
	rejectQuestionsEpic, 
	verifyPinEpic,
	updateDoctorProfileEpic
} from './doctor';

const rootEpic = combineEpics(
	fetchLoginEpic,
	fetchSignUpEpic,
	fetchForgetPasswordEpic,
	fetchEmailVerifyEpic,
	fetchResetPinEpic,
	fetchAddMemberEpic,
	fetchUserListEpic,
	fetchUserNoteEpic,
	fetchLogOutEpic,
	fetchUserDeactivateIdEpic,
	fetchNotesEpic,
	fetchDoctorListEpic,
	fetchUserNoteUpdateEpic,
	fetchDoctorDetailEpic,
	fetchDeleteNoteEpic,
	fetchDentalVisitsEpic,
	createDentalVisitEpic,
	fetchReminderListEpic,
	updateReminderEpic,
	editSavedDentalVisitEpic,
	deleteDentalVisitEpic,
	deleteReminderEpic,
	getUsersEpic,
	createReminderEpic,
	getUserEpic,
	updateUserEpic,
	fetchReminderListBasedOnFilterEpic,
	fetchDentalQuestionsEpic,
	answerQuestionsEpic,
	rejectQuestionsEpic,
	getMyProfileEpic,
	verifyPinEpic,
	updateDoctorProfileEpic
);

export default rootEpic;
