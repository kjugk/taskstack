import { all, call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as constants from '../constants';
import * as tasklistActions from '../actions/tasklistActions';
import * as createFormActions from '../actions/tasklistCreateFormActions';
import * as editFormActions from '../actions/tasklistEditFormActions';
import * as messageActions from '../actions/messageActions';
import * as api from '../Api';
import { normalize, schema } from 'normalizr';

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
  function* create(action: any) {
    try {
      const tasklist = new schema.Entity('tasklist');
      const res = yield call(api.postTasklist, action.payload.params);
      const normalized = normalize(res.data, { tasklist });

      yield delay(1000);
      yield put(
        tasklistActions.receiveNewTasklist(normalized.result.tasklist, normalized.entities.tasklist)
      );
      // yield put(createFormActions.close());
      yield put(createFormActions.complete());
      yield put(messageActions.setMessage('リストを作成しました。'));
    } catch (e) {
      // TODO error handrong
    }
  }

  /**
   * tasklistを更新する。
   */
  function* update(action: any) {
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
    yield call(api.destroyTasklist, action.payload.id);

    yield delay(1000);
    yield put(tasklistActions.receiveDestroyedTasklistId(action.payload.id));
    yield put(messageActions.setMessage('リストを削除しました。'));
  }

  yield all([
    takeLatest(constants.TASKLISTS_FETCH, fetch),
    takeLatest(constants.TASKLIST_CREATE_FORM_SUBMIT, create),
    takeLatest(constants.TASKLIST_EDIT_FORM_SUBMIT, update),
    takeLatest(constants.TASKLIST_DESTROY, destroy)
  ]);
}
