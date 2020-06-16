import { mergeMap, map, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';

import {  apiCall } from '../../utilities/axios-interceptor';
import { setQuestions, apiSuccess } from '../actions/doctor';
import { 
	GET_QUESTIONS, 
	ANSWER_QUESTION, 
	REJECT_QUESTION, 
	VERIFY_PIN, 
	API_FAILURE,
	UPDATE_DOCTOR_PROFILE
} from '../constants/doctor';

import Endpoints from '../../constants/endPoint';

function toDentalQuestions(response) {
	return setQuestions(response);
}

function fetchDentalQuestionsEpic(action$) {
	return action$.pipe(
		ofType(GET_QUESTIONS),
		mergeMap(getDentalQuestions)
	);
}

function getDentalQuestions(payload) {
	const { onFailure } = payload;

	return from(
		apiCall({
			url: Endpoints.GET_QUESTIONS,
            method: 'GET',
            headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			withCredentials: true
		})
    )
    .pipe(
        map(response => toDentalQuestions(response.data)),
        catchError(error => {
            return of({
                type: 'GET_DENTAL_QUESTIONS_LIST_FAILURE',
                payload: onFailure(error)
            });
        })
    );
}

function toResponseQuestions(response, onSuccess) {
	onSuccess();
	return apiSuccess();
}

function answerQuestionsEpic(action$) {
	return action$.pipe(
		ofType(ANSWER_QUESTION),
		mergeMap(answerQuestions)
	);
}

function answerQuestions(payload) {
	const { data, onSuccess, onFailure } = payload;

	return from(
		apiCall({
			url: `${Endpoints.GET_QUESTIONS}${data.id}/respond-question/`,
            method: 'POST',
			data: data.data,
			withCredentials: true
		})
    )
    .pipe(
        map((response) => toResponseQuestions(response, onSuccess)),
        catchError(error => {
			return of({
                type: API_FAILURE,
                payload: onFailure(error)
            });
        })
    );
}

function rejectQuestionsEpic(action$) {
	return action$.pipe(
		ofType(REJECT_QUESTION),
		mergeMap(rejectQuestions)
	);
}

function rejectQuestions(payload) {
	const { data, onSuccess, onFailure } = payload;
	return from(
		apiCall({
			url: `${Endpoints.GET_QUESTIONS}${data.id}/reject-question/`,
            method: 'POST',
			data: data.data,
			withCredentials: true
		})
    )
    .pipe(
        map((response) => toResponseQuestions(response, onSuccess)),
        catchError(error => {
            return of({
                type: API_FAILURE,
                payload: onFailure(error)
            });
        })
    );
}

function verifyPinEpic(action$) {
	return action$.pipe(
		ofType(VERIFY_PIN),
		mergeMap(verifySecretPin)
	);
}

function verifySecretPin(payload) {
	const { data, onSuccess, onFailure } = payload;

	return from(
		apiCall({
			url: Endpoints.VERIFY_PIN,
			method: 'GET',
			data: data,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			withCredentials: true
		})
    )
    .pipe(
        map((response) => toResponseQuestions(response, onSuccess)),
        catchError(error => {
			return of({
                type: API_FAILURE,
                payload: onFailure(error)
            });
        })
    );
}

function toSetUpdateDoctorProfile(response, onSuccess) {
	onSuccess();
	return apiSuccess();
}

function updateDoctorProfileEpic(action$) {
	return action$.pipe(
		ofType(UPDATE_DOCTOR_PROFILE),
		mergeMap(updateDoctorProfile)
	);
}

function updateDoctorProfile(payload) {
	const { onSuccess, onFailure } = payload;

	return from(
		apiCall({
			url: Endpoints.UPDATE_DOCTOR_PROFILE,
            method: 'POST',
			data: { ...payload.payload },
			withCredentials: true
		})
    )
    .pipe(
        map((response) => toSetUpdateDoctorProfile(response, onSuccess)),
        catchError(error => {
            return of({
                type: 'UPDATE_DOCTOR_PROFILE_FAILURE',
                payload: onFailure(error)
            });
        })
    );
}

export { 
	fetchDentalQuestionsEpic,
	answerQuestionsEpic,
	rejectQuestionsEpic,
	verifyPinEpic,
	updateDoctorProfileEpic
};
