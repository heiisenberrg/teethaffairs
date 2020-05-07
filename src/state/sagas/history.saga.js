import { call, put } from 'redux-saga/effects';
import {
  getHistorySuccess,
  getHistoryFailure
} from '../actions/history';

import { getPatientHistories } from '../services/history.service';

export function* getPatientHistory (action) {
    const { data } = action;
    try {
        const response = yield call(getPatientHistories, data);
        yield put(getHistorySuccess(response));
    } catch (e) {
        yield put(getHistoryFailure(e));
    }
}