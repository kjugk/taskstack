import * as constants from '../constants';

export const fetchTasklists = () => {
  return {
    type: constants.TASKLISTS_FETCH,
    payload: {}
  };
};

// TODO entity type を定義する。
export const receiveTasklists = (ids: number[], tasklistsById: any) => {
  return {
    type: constants.TASKLISTS_FETCH_SUCCESS,
    payload: {
      ids,
      tasklistsById
    }
  };
};

// TODO entity type を定義する。
export const receiveNewTasklist = (id: number, tasklistById: any) => {
  return {
    type: constants.TASKLIST_CREATE_SUCCESS,
    payload: {
      id,
      tasklistById
    }
  };
};
