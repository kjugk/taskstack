import * as constants from '../constants';

export const fetchTasks = (tasklistId: number) => {
  return {
    type: constants.TASKS_FETCH,
    payload: {
      tasklistId
    }
  };
};

export const receiveTasks = (tasklistId: number, tasksById: any) => {
  return {
    type: constants.TASKS_FETCH_SUCCESS,
    payload: {
      tasklistId,
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

export const destroyTask = (id: number) => {
  return {
    type: constants.TASK_DESTROY,
    payload: {
      id
    }
  };
};

export const receiveDestroyedTaskId = (id: number) => ({
  type: constants.TASK_DESTROY_SUCCESS,
  payload: {
    id
  }
});

export const updateSort = (tasklistId: number, taskIds: number[]) => ({
  type: constants.TASK_SORT_UPDATE,
  payload: {
    tasklistId,
    taskIds
  }
});

export const receiveDestroyedTaskIds = (taskIds: number[]) => ({
  type: constants.COMPLETED_TASKS_DESTROY_SUCCESS,
  payload: {
    taskIds
  }
});
