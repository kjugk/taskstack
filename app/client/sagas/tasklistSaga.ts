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

export default function* tasklistSaga() {
  /**
   * tasklist のリストを取得する。
   */
  function* fetch() {
    const tasklist = new schema.Entity('tasklists');
    const res = yield call(api.fetchTasklists);
    const normalized = normalize(res.data, { tasklists: [tasklist] });

    yield put(
      tasklistActions.receiveTasklists(
        normalized.result.tasklists,
        normalized.entities.tasklists || {}
      )
    );
  }

  /**
   * tasklist のリストを作成する。
   */
  function* create(action: TasklistCreateFormAction) {
    if (!isActionOf(createFormActions.submit, action)) return;

    try {
      const tasklist = new schema.Entity('tasklist');
      const res = yield call(api.postTasklist, action.payload.params);
      const normalized = normalize(res.data, { tasklist });

      yield delay(1000);
      yield put(
        tasklistActions.receiveCreatedTasklist(
          normalized.result.tasklist,
          normalized.entities.tasklist
        )
      );
      yield put(sidebarActions.close());
      yield put(createFormActions.complete());
      yield put(messageActions.setMessage('リストを作成しました。'));
    } catch (e) {
      // TODO error handrong
    }
  }

  /**
   * tasklistを更新する。
   */
  function* update(action: TasklistEditFormAction) {
    if (!isActionOf(editFormActions.submit, action)) return;

    try {
      const { id, params } = action.payload;
      const res = yield call(api.updateTasklist, id, params);

      yield delay(1000);
      yield put(tasklistActions.receiveUpdatedTasklist(res.data.tasklist));
      yield put(editFormActions.complete());
      yield put(messageActions.setMessage('リストを更新しました。'));
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * tasklist を削除する。
   */
  function* destroy(action: any) {
    if (!isActionOf(editFormActions.destroyTasklist, action)) return;

    yield call(api.destroyTasklist, action.payload.id);

    yield delay(1000);
    yield put(tasklistActions.receiveDestroyedTasklistId(action.payload.id));
    yield put(messageActions.setMessage('リストを削除しました。'));
  }

  function* destoryCompletedTasks(action: any) {
    const res = yield call(api.destoryCompletedTasks, action.payload.tasklistId);

    yield delay(1000);
    yield put(tasklistActions.receiveUpdatedTasklist(res.data.tasklist));
    yield put(taskActions.receiveDestroyedTaskIds(action.payload.taskIds));
    yield put(messageActions.setMessage(`${action.payload.taskIds.length}件削除しました。`));
  }

  yield all([
    takeLatest(getType(tasklistActions.fetchTasklists), fetch),
    takeLatest(getType(tasklistActions.destroyCompletedTasks), destoryCompletedTasks),
    takeLatest(getType(createFormActions.submit), create),
    takeLatest(getType(editFormActions.submit), update),
    takeLatest(getType(editFormActions.destroyTasklist), destroy)
  ]);
}
