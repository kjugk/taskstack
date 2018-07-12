import { all, fork } from 'redux-saga/effects';
import tasklistSaga from './tasklistSaga';
import taskSaga from './taskSaga';

export default function* rootSaga() {
  yield all([
    fork(tasklistSaga),
    fork(taskSaga)
  ]);
}
