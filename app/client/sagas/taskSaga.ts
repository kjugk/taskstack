import { all, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as constants from '../constants';
import * as taskActions from '../actions/taskActions';
import * as messageActions from '../actions/messageActions';
import * as api from '../Api';
import { normalize, schema } from 'normalizr';

export default function* taskSaga() {
  /**
   * task のリストを取得する。
   */
  function* fetchTasks(action: any) {
    const tasks = new schema.Entity('tasks');
    const res = yield call(api.fetchTasks, action.payload.tasklistId);
    const normalized = normalize(res.data, { tasks: [tasks] });

    yield put(taskActions.receiveTasks(normalized.entities.tasks || {}));
    // TODO ids を tasklist に保存する
  }

  yield all([takeLatest(constants.TASKS_FETCH, fetchTasks)]);
}
