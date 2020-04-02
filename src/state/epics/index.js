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
	fetchNotesEpic
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
	fetchNotesEpic
);

export default rootEpic;
