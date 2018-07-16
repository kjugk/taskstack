import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as constants from '../constants';
import * as tasklistActions from '../actions/tasklistActions';
import * as taskActions from '../actions/taskActions';
import * as taskCreateFormActions from '../actions/taskCreateFormActions';
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
    yield put(tasklistActions.receiveTaskIds(action.payload.tasklistId, normalized.result.tasks));
  }

  function* createTask(action: any) {
    const task = new schema.Entity('task');
    const res = yield call(api.createTask, action.payload.tasklistId, action.payload.params);
    const normalized = normalize(res.data, { task: task });

    yield put(taskActions.receiveNewTask(normalized.entities.task || {}));
    yield put(tasklistActions.receiveTaskId(action.payload.tasklistId, normalized.result.task));
    yield put(taskCreateFormActions.clear());
  }

  yield all([
    takeLatest(constants.TASKS_FETCH, fetchTasks),
    takeLatest(constants.TASK_CREATE_FORM_SUBMIT, createTask)
  ]);
}
