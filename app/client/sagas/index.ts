import { all, fork, call, put } from 'redux-saga/effects';
import tasklistSaga from './tasklistSaga';
import taskSaga from './taskSaga';
import userSaga from './userSaga';

function* forkAllSagas() {
  yield all([fork(tasklistSaga), fork(taskSaga), fork(userSaga)]);
}

export default function* rootSaga() {
  try {
    yield call(forkAllSagas);
  } catch (e) {
    // 予期しないエラーが発生した
    // TODO: バグトラックにエラー送信
    // TODO: ネットワークエラーと reducer に通知する
    console.log(e);
  }
}
