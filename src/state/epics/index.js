import { combineEpics } from 'redux-observable';

import {
	fetchLoginEpic,
	fetchSignUpEpic,
	fetchForgetPasswordEpic,
	fetchEmailVerifyEpic,
	fetchResetPinEpic,
	fetchLogOutEpic
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
	createDentalVisitEpic
} from './journal';

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
	createDentalVisitEpic
);

export default rootEpic;
