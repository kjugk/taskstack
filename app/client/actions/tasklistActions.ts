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

export const createTasklist = () => {
  return {
    type: constants.TASKLIST_CREATE_START,
    payload: {}
  }
}

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

export const editTasklist = (tasklist: any) => {
  return {
    type: constants.TASKLIST_EDIT_START,
    payload: {
      tasklist
    }
  }
}

export const receiveUpdatedTasklist = (tasklist: any) => {
  return {
    type: constants.TASKLIST_UPDATE_SUCCESS,
    payload: {
      tasklist
    }
  }
}