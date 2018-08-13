import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import * as api from '../Api';
import * as userActions from '../actions/userActions';
import * as messageActions from '../actions/messageActions';
import * as Cookies from 'js-cookie';
import { UserAction } from '../reducers/user';

export default function* userSaga() {
  function* verifyUser(action: UserAction) {
    try {
      const res = yield call(api.verifyUser);

      yield put(userActions.verifySuccess(res.data.user));
    } catch (e) {
      yield put(userActions.verifyFailure());
    }
  }

  function* signOut(action: UserAction) {
    Cookies.remove('token');
    yield put(userActions.signOutSuccess());
    yield put(messageActions.setMessage('ログアウトしました'));
  }

  yield all([takeLatest(getType(userActions.verify), verifyUser)]);
  yield all([takeLatest(getType(userActions.signOut), signOut)]);
}
