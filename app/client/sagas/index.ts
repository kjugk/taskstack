import { all, fork, call, put } from 'redux-saga/effects';
import tasklistSaga from './tasklistSaga';
import taskSaga from './taskSaga';
import userSaga from './userSaga';
import * as appActions from '../actions/appActions';

function* forkAllSagas() {
  yield all([fork(tasklistSaga), fork(taskSaga), fork(userSaga)]);
}

export default function* rootSaga() {
  try {
    yield call(forkAllSagas);
  } catch (e) {
    // 予期しない(明示的にcatchしない) エラーが発生した場合
    // TODO: バグトラックシステムにエラーを送信する
    const { response } = e;

    if (response) {
      switch (response.status) {
        case 401:
        case 403:
          return;
        default:
          return;
      }
    } else {
      // ネットワークエラー
      yield put(appActions.notifyUnknownError());
      yield call(forkAllSagas);
    }
  }
}
