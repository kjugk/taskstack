import { all, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { getType, isActionOf } from 'typesafe-actions';
import * as tasklistActions from '../actions/tasklistActions';
import * as createFormActions from '../actions/tasklistCreateFormActions';
import * as editFormActions from '../actions/tasklistEditFormActions';
import * as messageActions from '../actions/messageActions';
import * as sidebarActions from '../actions/sidebarActions';
import * as api from '../api';
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
    const { entities } = normalize(data, { tasklists: [tasklistsSchema] });

    yield put(tasklistActions.fetchTasklistsSuccess(data.tasklistIds, entities.tasklists || {}));
  }

  /**
   * tasklist を作成する。
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
   * tasklist を更新する。
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

  /**
   * 並び順を更新する。
   * @param action
   */
  function* sortTasklist(action: any) {
    if (!isActionOf(tasklistActions.sortTasklist, action)) return;

    const { ids } = action.payload;
    yield put(tasklistActions.sortTasklistSuccess(ids));
    try {
      yield call(api.sortTasklist, { tasklist_id_list: ids });
    } catch (e) {
      // このエラーはユーザーに知らせない
    }
  }

  /**
   * task の並び順を更新する。
   * @param action
   */
  function* sortTask(action: any) {
    if (!isActionOf(tasklistActions.sortTask, action)) return;

    const { tasklistId, taskIds } = action.payload;

    api.updateTasklist(tasklistId, { task_id_list: taskIds });
    yield put(tasklistActions.sortTaskSuccess(tasklistId, taskIds));
  }

  yield all([
    takeLatest(getType(tasklistActions.fetchTasklists), fetch),
    takeLatest(getType(createFormActions.submit), create),
    takeLatest(getType(editFormActions.submit), update),
    takeLatest(getType(editFormActions.destroyTasklist), destroy),
    takeLatest(getType(tasklistActions.sortTasklist), sortTasklist),
    takeLatest(getType(tasklistActions.sortTask), sortTask)
  ]);
}
