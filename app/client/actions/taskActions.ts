import * as constants from '../constants';

export const fetchTasks = (tasklistId: number) => {
  return {
    type: constants.TASKS_FETCH,
    payload: {
      tasklistId
    }
  };
};

export const receiveTasks = (tasksById: any) => {
  return {
    type: constants.TASKS_FETCH_SUCCESS,
    payload: {
      tasksById
    }
  };
};

export const receiveNewTask = (task: any) => {
  return {
    type: constants.TASK_CREATE_SUCCESS,
    payload: {
      task
    }
  };
};

export const updateTask = (id: number, params: any) => {
  return {
    type: constants.TASK_UPDATE,
    payload: {
      id,
      params
    }
  };
};

export const receiveUpdatedTask = (task: any) => {
  return {
    type: constants.TASK_UPDATE_SUCCESS,
    payload: {
      task
    }
  };
};

export const selectTask = (id: number) => {
  return {
    type: constants.TASK_SELECT,
    payload: {
      id
    }
  };
};
