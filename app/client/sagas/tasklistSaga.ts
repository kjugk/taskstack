import { all, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getType, isActionOf } from 'typesafe-actions';
import * as tasklistActions from '../actions/tasklistActions';
import * as taskActions from '../actions/taskActions';
import * as createFormActions from '../actions/tasklistCreateFormActions';
import * as editFormActions from '../actions/tasklistEditFormActions';
import * as messageActions from '../actions/messageActions';
import * as sidebarActions from '../actions/sidebarActions';
import * as api from '../Api';
import { normalize, schema } from 'normalizr';
import { TasklistCreateFormAction } from '../reducers/tasklist/createForm';
import { TasklistEditFormAction } from '../reducers/tasklist/editForm';

const tasklistsSchema = new schema.Entity('tasklists');
const tasklistSchema = new schema.Entity('tasklist');

export default function* tasklistSaga() {
  /**
   * tasklist のリストを取得する。
   */
  function* fetch() {
    const { data } = yield call(api.fetchTasklists);
    const { result, entities } = normalize(data, { tasklists: [tasklistsSchema] });

    yield put(tasklistActions.fetchTasklistsSuccess(result.tasklists, entities.tasklists || {}));
  }

  /**
   * tasklist のリストを作成する。
   */
  function* create(action: TasklistCreateFormAction) {
    if (!isActionOf(createFormActions.submit, action)) return;

    const { data } = yield call(api.postTasklist, action.payload.params);
    const { result, entities } = normalize(data, { tasklist: tasklistSchema });

    yield delay(1000);
    yield put(tasklistActions.createSuccess(result.tasklist, entities.tasklist));
    yield put(sidebarActions.close());
    yield put(createFormActions.complete());
    yield put(messageActions.set('リストを作成しました。'));
  }

  /**
   * tasklistを更新する。
   */
  function* update(action: TasklistEditFormAction) {
    if (!isActionOf(editFormActions.submit, action)) return;

    const { id, params } = action.payload;
    const { data } = yield call(api.updateTasklist, id, params);

    yield delay(1000);
    yield put(tasklistActions.updateSuccess(data.tasklist));
    yield put(editFormActions.complete());
    yield put(sidebarActions.close());
    yield put(messageActions.set('リストを更新しました。'));
  }

  /**
   * tasklist を削除する。
   */
  function* destroy(action: any) {
    if (!isActionOf(editFormActions.destroyTasklist, action)) return;

    const { id } = action.payload;

    yield delay(1000);
    yield call(api.destroyTasklist, id);
    yield put(tasklistActions.destroySuccess(id));
    yield put(sidebarActions.close());
    yield put(messageActions.set('リストを削除しました。'));
  }

  function* destoryCompletedTasks(action: any) {
    const { data } = yield call(api.destoryCompletedTasks, action.payload.tasklistId);
    const { taskIds } = action.payload;

    yield delay(1000);
    yield put(tasklistActions.updateSuccess(data.tasklist));
    yield put(taskActions.destroyCompletedTasksSuccess(taskIds));
    yield put(messageActions.set(`${taskIds.length}件削除しました。`));
  }

  yield all([
    takeLatest(getType(tasklistActions.fetchTasklists), fetch),
    takeLatest(getType(tasklistActions.removeCompletedTaskIds), destoryCompletedTasks),
    takeLatest(getType(createFormActions.submit), create),
    takeLatest(getType(editFormActions.submit), update),
    takeLatest(getType(editFormActions.destroyTasklist), destroy)
  ]);
}
