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
    // 予期しないエラーが発生した場合
    // TODO: バグトラックにエラー送信
    const { response } = e;

    if (response) {
      switch (response.status) {
        case 401:
        case 403:
          location.href = '/';
          return;
      }
    }

    yield put(appActions.notifyUnknownError());
    yield call(forkAllSagas);
  }
}
