import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as tasklistActions from '../actions/tasklistActions';
import * as taskActions from '../actions/taskActions';
import * as taskCreateFormActions from '../actions/taskCreateFormActions';
import * as messageActions from '../actions/messageActions';
import * as api from '../api';
import { normalize, schema } from 'normalizr';
import { getType, isActionOf } from 'typesafe-actions';
import { TaskCreateFormAction } from '../reducers/task/createForm';
import { TaskAction } from '../reducers/tasks';

const tasksSchema = new schema.Entity('tasks');
const taskSchema = new schema.Entity('task');

export default function* taskSaga() {
  /**
   * task のリストを取得する。
   */
  function* fetchTasks(action: TaskAction) {
    if (!isActionOf(taskActions.fetchTasks, action)) return;

    const { tasklistId } = action.payload;
    const { data } = yield call(api.fetchTasks, tasklistId);
    const { entities } = normalize(data, { tasks: [tasksSchema] });

    yield put(tasklistActions.fetchTasksSuccess(tasklistId));
    yield put(taskActions.fetchTasksSuccess(tasklistId, entities.tasks || {}));
  }

  /**
   * task を作成する
   * @param action TaskCreateFormAction
   */
  function* createTask(action: TaskCreateFormAction) {
    if (!isActionOf(taskCreateFormActions.submit, action)) return;

    const { tasklistId, params } = action.payload;
    const { data } = yield call(api.createTask, tasklistId, params);
    const { entities } = normalize(data, { task: taskSchema });

    yield put(taskActions.createSuccess(entities.task || {}));
    yield put(tasklistActions.sortTaskSuccess(tasklistId, data.taskIds));
    yield put(tasklistActions.updateTaskCount(tasklistId, data.taskCount));
    yield put(taskCreateFormActions.clear());
  }

  /**
   * task を更新する
   * @param action
   */
  function* updateTask(action: TaskAction) {
    if (!isActionOf(taskActions.update, action)) return;

    const { id, params } = action.payload;
    const { data } = yield call(api.updateTask, id, params);

    yield put(taskActions.updateSuccess(data.task));
    yield put(tasklistActions.updateTaskCount(data.task.tasklistId, data.taskCount));
  }

  /**
   * task を削除する
   * @param action
   */
  function* destroyTask(action: TaskAction) {
    if (!isActionOf(taskActions.destroy, action)) return;

    const { data } = yield call(api.destroyTask, action.payload.id);

    yield put(taskActions.destroySuccess(action.payload.id));
    yield put(tasklistActions.sortTaskSuccess(data.task.tasklistId, data.taskIds));
    yield put(tasklistActions.updateTaskCount(data.task.tasklistId, data.taskCount));
    yield put(messageActions.set('削除しました'));
  }

  /**
   * task の並び順を更新する。
   * 更新されるのは、tasklist の taskIds なのに注意。(てかそれならtasklsitAction にあるべきでは?)
   * @param action
   */
  function* updateSort(action: any) {
    if (!isActionOf(taskActions.updateTaskSort, action)) return;

    const { tasklistId, taskIds } = action.payload;

    api.updateTasklist(tasklistId, { task_id_list: taskIds });
    yield put(tasklistActions.sortTaskSuccess(tasklistId, taskIds));
  }

  yield all([
    takeLatest(getType(taskActions.fetchTasks), fetchTasks),
    takeLatest(getType(taskCreateFormActions.submit), createTask),
    takeLatest(getType(taskActions.update), updateTask),
    takeLatest(getType(taskActions.destroy), destroyTask),
    takeLatest(getType(taskActions.updateTaskSort), updateSort)
  ]);
}
