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
	fetchUserDeactivateIdEpic
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
	fetchUserDeactivateIdEpic
);

export default rootEpic;
