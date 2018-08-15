import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as tasklistActions from '../actions/tasklistActions';
import * as taskActions from '../actions/taskActions';
import * as taskCreateFormActions from '../actions/taskCreateFormActions';
import * as messageActions from '../actions/messageActions';
import * as api from '../Api';
import { normalize, schema } from 'normalizr';
import { getType, isActionOf } from 'typesafe-actions';
import { TaskCreateFormAction } from '../reducers/task/createForm';
import { TaskAction } from '../reducers/tasks';

export default function* taskSaga() {
  /**
   * task のリストを取得する。
   */
  function* fetchTasks(action: TaskAction) {
    if (!isActionOf(taskActions.fetchTasks, action)) return;

    const tasks = new schema.Entity('tasks');
    const res = yield call(api.fetchTasks, action.payload.tasklistId);
    const normalized = normalize(res.data, { tasks: [tasks] });

    yield put(taskActions.setTasks(action.payload.tasklistId, normalized.entities.tasks || {}));
    yield put(tasklistActions.setTaskLoadedFlag(action.payload.tasklistId));
  }

  /**
   * task を作成する
   * @param action TaskCreateFormAction
   */
  function* createTask(action: TaskCreateFormAction) {
    if (isActionOf(taskCreateFormActions.submit, action)) {
      const task = new schema.Entity('task');
      const res = yield call(api.createTask, action.payload.tasklistId, action.payload.params);
      const normalized = normalize(res.data, { task });

      yield put(taskActions.setCreatedTask(normalized.entities.task || {}));
      yield put(tasklistActions.setTaskIds(action.payload.tasklistId, res.data.taskIds));
      yield put(tasklistActions.setTaskCount(action.payload.tasklistId, res.data.taskCount));
      yield put(taskCreateFormActions.clear());
    }
  }

  /**
   * task を更新する
   * @param action
   */
  function* updateTask(action: TaskAction) {
    if (!isActionOf(taskActions.updateTask, action)) return;

    const res = yield call(api.updateTask, action.payload.id, action.payload.params);

    yield put(taskActions.setUpdatedTask(res.data.task));
    yield put(tasklistActions.setTaskCount(res.data.task.tasklistId, res.data.taskCount));
  }

  /**
   * task を削除する
   * @param action
   */
  function* destroyTask(action: TaskAction) {
    if (!isActionOf(taskActions.destroyTask, action)) return;

    const res = yield call(api.destroyTask, action.payload.id);

    yield put(taskActions.removeDestroyedTaskId(action.payload.id));
    yield put(tasklistActions.setTaskIds(res.data.task.tasklistId, res.data.taskIds));
    yield put(tasklistActions.setTaskCount(res.data.task.tasklistId, res.data.taskCount));
    yield put(messageActions.setMessage('削除しました'));
  }

  /**
   * task の並び順を更新する。
   * 更新されるのは、tasklist の taskIds なのに注意。(てかそれならtasklsitAction にあるべきでは?)
   * @param action
   */
  function* updateSort(action: any) {
    if (!isActionOf(taskActions.updateTaskSort, action)) return;
    api.updateTasklist(action.payload.tasklistId, { task_id_list: action.payload.taskIds });

    yield put(tasklistActions.setTaskIds(action.payload.tasklistId, action.payload.taskIds));
  }

  yield all([
    takeLatest(getType(taskActions.fetchTasks), fetchTasks),
    takeLatest(getType(taskCreateFormActions.submit), createTask),
    takeLatest(getType(taskActions.updateTask), updateTask),
    takeLatest(getType(taskActions.destroyTask), destroyTask),
    takeLatest(getType(taskActions.updateTaskSort), updateSort)
  ]);
}
