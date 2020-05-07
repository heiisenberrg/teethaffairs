import { call, put } from 'redux-saga/effects';
import {
  getCardsSuccess,
  getCardsFailure,
  // createCardSuccess,
  createCardFailure,
  upgradeAppSuccess,
  upgradeAppFailure
} from '../actions/payment';

import { getCustomerCards, createCards, pay } from '../services/payment.service';
import FlashMessage from '../../components/global/FlashMessage';

export function* getCards () {
  try {
    const response = yield call(getCustomerCards);
    yield put(getCardsSuccess(response));
  } catch (e) {
    yield put(getCardsFailure(e));
  }
}

export function* createCard (action) {
  const { data } = action;
  try {
    const response = yield call(createCards, data.data);
    if (response) {
      data.onSuccess();
    }
    // yield put(createCardSuccess(response));
  } catch (e) {
    yield put(createCardFailure(e));
  }
}

export function* upgradeApp (action) {
  const { data } = action;
  try {
    const response = yield call(pay, data.data);
    if (response) {
      data.onSuccess();
    }
    FlashMessage.message('Success', 'Your payment is successfull, app got upgraded', 'green');
    yield put(upgradeAppSuccess(response));
  } catch (e) {
    FlashMessage.message('Alert', 'Something went wrong. Please try again later', '#ff4444');
    yield put(upgradeAppFailure(e));
  }
}
