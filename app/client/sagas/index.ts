import { all, fork} from 'redux-saga/effects';
import tasklistSaga from './tasklistSaga';

export default function* rootSaga() {
  yield all([
    fork(tasklistSaga)
  ]);
}
