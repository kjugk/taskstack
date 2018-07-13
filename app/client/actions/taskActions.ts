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
