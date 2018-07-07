import { all, call, fork, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as constants from '../constants';
import * as createFormActions from '../actions/tasklistCreateFormActions';

import * as api from '../Api'

export default function* tasklistSaga() {
  function* create(action: any) {
    // const res = yield call(api.postTasklist, {})
    yield delay(1000);
    yield put(createFormActions.close());
  }

  yield takeLatest(constants.TASKLIST_CREATE_FORM_SUBMIT, create);
}
