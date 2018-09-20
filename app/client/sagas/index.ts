import { all, fork, call, put } from 'redux-saga/effects';
import tasklistSaga from './tasklistSaga';
import taskSaga from './taskSaga';
import userSaga from './userSaga';
import * as Cookies from 'js-cookie';
import * as appActions from '../actions/appActions';
import * as userActions from '../actions/userActions';
import * as messageActions from '../actions/messageActions';

function* forkAllSagas() {
  yield all([fork(tasklistSaga), fork(taskSaga), fork(userSaga)]);
}

export default function* rootSaga() {
  try {
    yield call(forkAllSagas);
  } catch (e) {
    // 予期しない(意図的に catchしない) エラーが発生した場合の処理
    const { response } = e;

    if (response) {
      if (response.status >= 400 && response.status < 500) {
        // セッションタイムアウトの場合は、「ログアウトしました」を出してトップに遷移する
        Cookies.remove('token');
        yield put(userActions.signOutSuccess());
        yield put(messageActions.set('ログアウトしました'));
      } else if (response.status >= 500 && response.status < 600) {
        // TODO: バグトラックシステムにエラーを送信する
        yield put(messageActions.set('通信中にエラーが発生しました。'));
      }
    } else {
      // ネットワークエラーは、全画面切り替えで、「再接続」を促す。
      yield put(appActions.notifyUnknownError());
      yield call(forkAllSagas);
    }
  }
}
