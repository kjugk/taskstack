import { all, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getType } from 'typesafe-actions';
import * as api from '../api';
import * as userActions from '../actions/userActions';
import * as messageActions from '../actions/messageActions';
import * as Cookies from 'js-cookie';
import { UserAction } from '../reducers/user';

export default function* userSaga() {
  function* verify(action: UserAction) {
    try {
      const { data } = yield call(api.verifyUser);

      yield delay(1000);
      yield put(userActions.verifySuccess(data.user));
    } catch (e) {
      yield put(userActions.verifyFailure());
    }
  }

  function* signOut(action: UserAction) {
    Cookies.remove('token'); // TODO: helper に移す
    yield put(userActions.signOutSuccess());
    yield put(messageActions.set('ログアウトしました'));
  }

  yield all([takeLatest(getType(userActions.verify), verify)]);
  yield all([takeLatest(getType(userActions.signOut), signOut)]);
}
