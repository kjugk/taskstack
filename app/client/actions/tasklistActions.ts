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

export const receiveTaskCount = (tasklistId: number, taskCount: number) => ({
  type: constants.TASK_COUNT_UPDATE_SUCCESS,
  payload: {
    tasklistId,
    taskCount
  }
});

export const destroyCompletedTasks = (tasklistId: number, taskIds: number[]) => ({
  type: constants.COMPLETED_TASKS_DESTROY,
  payload: {
    tasklistId,
    taskIds
  }
});
