import { createAction } from 'typesafe-actions';

export const fetchTasks = createAction('task/FETCH_TASKS', (resolve) => {
  return (tasklistId: number) => resolve({ tasklistId });
});

export const fetchTasksSuccess = createAction('task/FETCH_TASKS_SUCCESS', (resolve) => {
  return (tasklistId: number, tasksById: any) => resolve({ tasklistId, tasksById });
});

export const createSuccess = createAction('task/CREATE_SUCCESS', (resolve) => {
  return (task: any) => resolve({ task });
});

export const update = createAction('task/UPDATE', (resolve) => {
  return (id: number, params: any) => resolve({ id, params });
});

export const updateSuccess = createAction('task/UPDATED_SUCCESS', (resolve) => {
  return (task: any) => resolve({ task });
});

export const destroy = createAction('task/DESTROY', (resolve) => {
  return (id: number) => resolve({ id });
});

export const removeDestroyedTaskId = createAction('task/REMOVE_DESTROYED_TASK_ID', (resolve) => {
  return (id: number) => resolve({ id });
});

// TODO: このメソッドの置き場所を考える
export const updateTaskSort = createAction('task/UPDATE_TASK_SORT', (resolve) => {
  return (tasklistId: number, taskIds: number[]) => resolve({ tasklistId, taskIds });
});

export const removeDestroyedTaskIds = createAction('task/REMOVE_DESTROYED_TASK_IDS', (resolve) => {
  return (taskIds: number[]) => resolve({ taskIds });
});
