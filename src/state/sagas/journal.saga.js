import { call, put } from 'redux-saga/effects';
import {
	getAddMemberSuccess,
	getAddMemberFailure,
	getUserListSuccess,
	getUserListFailure,
	getUserNoteSuccess,
	getUserNoteFailure,
	getDeactivateUserIdSuccess,
	getDeactivateUserIdFailure,
	fetchNotesSuccess,
	fetchNotesFailure,
	getDoctorsListSuccess,
	getDoctorsListFailure,
	getQuestionSuccess,
	getQuestionFailure,
	getDeleteNoteSuccess,
	getDeleteNoteFailure,
	getDentalVisitsSuccess,
	getDentalVisitsFailure,
	createDentalVisitsSuccess,
	createDentalVisitsFailure,
	updateDentalVisitSuccess,
	updateDentalVisitFailure,
	deleteDentalVisitSuccess,
	deleteDentalVisitFailure,
	createUserNoteSuccess,
	createUserNoteFailure,
	updateUserNoteSuccess,
	updateUserNoteFailure,
	getRemoteConsultationsForPatientsSuccess,
	getRemoteConsultationsForPatientsFailure,
	getUpdateMemberFailure,
	getUpdateMemberSuccess
} from '../actions/journal';

import {
	getMember,
	getUsers,
	getNotes,
	deactivateUser,
	getNoteList,
	getDoctors,
	updateHealthHistory,
	sendQuestions,
	dentalVisit,
	getRemoteConsultationsForPatient,
	dentalVisitCreate,
	deleteNotes,
	updateDentalVisit,
	removeDentalVisit,
	createNote,
	updateNote,
	updateMember
} from '../services/journal.service';
import FlashMessage from '../../components/global/FlashMessage';

export function* fetchAddMember(action) {
	const { data, onSuccess, onFailure } = action;
	try {
		const response = yield call(getMember, data);
		onSuccess(response);
		yield put(getAddMemberSuccess(response));
	} catch (e) {
		onFailure();
		yield put(getAddMemberFailure(e));
	}
}

export function* fetchUpdateMember(action) {
	const { data, onSuccess, onFailure } = action;
	try {
		const response = yield call(updateMember, data);
		onSuccess(response);
		yield put(getUpdateMemberSuccess(response));
	} catch (e) {
		onFailure();
		yield put(getUpdateMemberFailure(e));
	}
}
export function* fetchUserList() {
	try {
		const response = yield call(getUsers);
		yield put(getUserListSuccess(response.data));
	} catch (e) {
		yield put(getUserListFailure(e));
	}
}

export function* fetchNote(action) {
	const { data } = action;
	try {
		const response = yield call(getNotes, data);
		yield put(getUserNoteSuccess(response));
	} catch (e) {
		yield put(getUserNoteFailure(e));
	}
}

export function* fetchUserDeactivateId(action) {
	const { data } = action;
	try {
		const response = yield call(deactivateUser, data);
		yield put(getDeactivateUserIdSuccess(response));
	} catch (e) {
		yield put(getDeactivateUserIdFailure(e));
	}
}

export function* fetchNoteList(action) {
	const { data } = action;
	try {
		const response = yield call(getNoteList, data);
		yield put(fetchNotesSuccess(response));
	} catch (e) {
		yield put(fetchNotesFailure(e));
	}
}

export function* fetchDoctorList(action) {
	const { data } = action;
	try {
		const response = yield call(getDoctors, data);
		yield put(getDoctorsListSuccess(response));
	} catch (e) {
		yield put(getDoctorsListFailure(e));
	}
}

export function* fetchSendQuestion(action) {
	const { data, onSuccess } = action;
	try {
		let response = yield call(updateHealthHistory, data);
		yield put(getQuestionSuccess(response));
		response = yield call(sendQuestions, data);
		onSuccess();
		yield put(getQuestionSuccess(response));
	} catch (e) {
		FlashMessage.message(
			'Failure',
			'Something went wrong. Please try again later.',
			'#ff4444'
		);
		yield put(getQuestionFailure(e));
	}
}

export function* getDentalVisits(action) {
	const { data } = action;
	try {
		const response = yield call(dentalVisit, data);
		yield put(getDentalVisitsSuccess(response));
	} catch (e) {
		yield put(getDentalVisitsFailure(e));
	}
}

export function* getRemoteConsultationsForPatients(action) {
	const { data } = action;
	try {
		const response = yield call(getRemoteConsultationsForPatient, data);
		yield put(getRemoteConsultationsForPatientsSuccess(response.data));
	} catch (e) {
		yield put(getRemoteConsultationsForPatientsFailure(e));
	}
}

export function* createUserNote(action) {
	const { data, onSuccess, onFailure } = action;
	try {
		const response = yield call(createNote, data);
		onSuccess(response);
		yield put(createUserNoteSuccess(response));
	} catch (e) {
		onFailure();
		yield put(createUserNoteFailure(e));
	}
}

export function* createDentalVisit(action) {
	const { data, onSuccess } = action;
	try {
		const response = yield call(dentalVisitCreate, data);
		onSuccess();
		yield put(createDentalVisitsSuccess(response));
	} catch (e) {
		yield put(createDentalVisitsFailure(e));
	}
}

export function* fetchDeleteNotes(action) {
	const { data, onSuccess, onFailure } = action;
	try {
		const response = yield call(deleteNotes, data);
		onSuccess();
		yield put(getDeleteNoteSuccess(response));
	} catch (e) {
		onFailure();
		yield put(getDeleteNoteFailure(e));
	}
}

export function* editDentalVisit(action) {
	const { id, data, onSuccess } = action;
	try {
		const response = yield call(updateDentalVisit, id, data);
		onSuccess();
		yield put(updateDentalVisitSuccess(response));
	} catch (e) {
		yield put(updateDentalVisitFailure(e));
	}
}

export function* deleteDentalVisit(action) {
	const { data } = action;
	try {
		const response = yield call(removeDentalVisit, data);
		yield put(deleteDentalVisitSuccess(response));
	} catch (e) {
		yield put(deleteDentalVisitFailure(e));
	}
}

export function* updateUserNote(action) {
	const { data, id, onSuccess, onFailure } = action;
	try {
		const response = yield call(updateNote, data, id);
		onSuccess(response.data);
		yield put(updateUserNoteSuccess(response));
	} catch (e) {
		onFailure();
		yield put(updateUserNoteFailure(e));
	}
}
