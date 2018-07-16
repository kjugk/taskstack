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

export const receiveTaskIds = (tasklistId: number, taskIds: number[]) => {
  return {
    type: constants.TASK_IDS_RECEIVE,
    payload: {
      tasklistId,
      taskIds
    }
  };
}

export const receiveTaskId = (tasklistId: number, taskId: number) => {
  return {
    type: constants.TASK_ID_RECEIVE,
    payload: {
      tasklistId,
      taskId
    }
  };
}

export const createTasklist = () => {
  return {
    type: constants.TASKLIST_CREATE_START,
    payload: {}
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

export const editTasklist = (tasklist: any) => {
  return {
    type: constants.TASKLIST_EDIT_START,
    payload: {
      tasklist
    }
  };
};

export const receiveUpdatedTasklist = (tasklist: any) => {
  return {
    type: constants.TASKLIST_UPDATE_SUCCESS,
    payload: {
      tasklist
    }
  };
};

export const receiveDestroyedTasklistId = (id: number) => {
  return {
    type: constants.TASKLIST_DESTROY_SUCCESS,
    payload: {
      id
    }
  };
};

export const selectTasklist = (id: number) => {
  return {
    type: constants.TASKLIST_SELECT,
    payload: {
      id
    }
  };
};

export const resetTasklistSelection = () => {
  return {
    type: constants.TASKLIST_SELECT_RESET,
    payload: {}
  };
};