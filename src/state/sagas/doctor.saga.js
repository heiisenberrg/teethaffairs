import { call, put } from 'redux-saga/effects';
import {
  getQuestionsSuccess,
  getQuestionsFailure,
  answerQuestionSuccess,
  answerQuestionFailure,
  rejectQuestionSuccess,
  rejectQuestionFailure,
  verifyPinSuccess,
  verifyPinFailure,
  updateDoctorProfileSuccess,
  updateDoctorProfileFailure,
  getHistoryQuestionsSuccess,
  getHistoryQuestionsFailure
} from '../actions/doctor';

import { view, respond, reject, pinVerify, profileUpdate, getDentalHistory } from '../services/doctor.service';

import FlashMessage from '../../components/global/FlashMessage';

export function* getDentalHistoryQuestions () {
  try {
    const response = yield call(getDentalHistory);
    yield put(getHistoryQuestionsSuccess(response));
  } catch (e) {
    yield put(getHistoryQuestionsFailure(e));
  }
}

export function* getDentalQuestions () {
  try {
    const response = yield call(view);
    yield put(getQuestionsSuccess(response));
  } catch (e) {
    yield put(getQuestionsFailure(e));
  }
}

export function* answerQuestions (action) {
  const { data } = action;
  try {
    const response = yield call(respond, data);
    data.onSuccess();
    yield put(answerQuestionSuccess(response));
  } catch (e) {
    FlashMessage.message('Alert', 'Something went wrong.Please try again later', '#ff4444');
    yield put(answerQuestionFailure(e));
  }
}

export function* rejectQuestions (action) {
  const { data } = action;
  try {
    const response = yield call(reject, data);
    data.navigation.goBack();
    yield put(rejectQuestionSuccess(response));
  } catch (e) {
    FlashMessage.message('Alert', 'Something went wrong.Please try again later', '#ff4444');
    yield put(rejectQuestionFailure(e));
  }
}

export function* verifySecretPin (action) {
  const { data, onSuccess } = action;
  try {
    const response = yield call(pinVerify, data);
    onSuccess(response.data);
    yield put(verifyPinSuccess(response));
  } catch (e) {
    FlashMessage.message('Alert', 'Please enter a valid pin', '#ff4444');
    yield put(verifyPinFailure(e));
  }
}

export function* updateDoctorProfile (action) {
  const { data } = action;
  try {
    const response = yield call(profileUpdate, data);
    yield put(updateDoctorProfileSuccess(response));
  } catch (e) {
    yield put(updateDoctorProfileFailure(e));
  }
}
