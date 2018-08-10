import { all, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as constants from '../constants';
import * as api from '../Api';
import * as userActions from '../actions/userActions';

export default function* userSaga() {
  function* verifyUser(action: any) {
    try {
      const res = yield call(api.verifyUser);

      yield put(userActions.receiveVerifiedUser(res.data.user));
    } catch (e) {
      yield put(userActions.failVefirication());
    }
  }

  yield all([takeLatest(constants.USER_VERIFY, verifyUser)]);
}
