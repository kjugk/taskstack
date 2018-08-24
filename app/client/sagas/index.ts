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
    // 予期しないエラーが発生した
    // TODO: バグトラックにエラー送信
    yield put(appActions.notifyUnknownError());

    // 復帰できるエラーなら、sagaを再起動する
    yield call(forkAllSagas);
  }
}
