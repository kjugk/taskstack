import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as constants from '../constants';
import * as tasklistActions from '../actions/tasklistActions';
import * as createFormActions from '../actions/tasklistCreateFormActions';
import * as messageActions from '../actions/messageActions';
import * as api from '../Api';

export default function* tasklistSaga() {
  function* create(action: any) {
    try {
      const res = yield call(api.postTasklist, action.payload.params);
      yield delay(1000);
      yield put(tasklistActions.receiveNewTasklist(res.data.tasklist));
      yield put(createFormActions.close());
      yield put(messageActions.setMessage('リストを作成しました。'));
    } catch (e) {
      // TODO error handrong
    }
  }

  yield takeLatest(constants.TASKLIST_CREATE_FORM_SUBMIT, create);
}
