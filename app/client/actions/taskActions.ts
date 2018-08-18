import { createAction } from 'typesafe-actions';

export const fetchTasks = createAction('FETCH_TASKS', (resolve) => {
  return (tasklistId: number) => resolve({ tasklistId });
});

export const setTasks = createAction('SET_TASKS', (resolve) => {
  return (tasklistId: number, tasksById: any) => resolve({ tasklistId, tasksById });
});

export const setCreatedTask = createAction('SET_CREATED_TASK', (resolve) => {
  return (task: any) => resolve({ task });
});

export const updateTask = createAction('UPDATE_TASK', (resolve) => {
  return (id: number, params: any) => resolve({ id, params });
});

export const setUpdatedTask = createAction('SET_UPDATED_TASK', (resolve) => {
  return (task: any) => resolve({ task });
});

export const destroyTask = createAction('DESTROY_TASK', (resolve) => {
  return (id: number) => resolve({ id });
});

export const removeDestroyedTaskId = createAction('REMOVE_DESTROYED_TASK_ID', (resolve) => {
  return (id: number) => resolve({ id });
});

// TODO: このメソッドの置き場所を考える
export const updateTaskSort = createAction('UPDATE_TASK_SORT', (resolve) => {
  return (tasklistId: number, taskIds: number[]) => resolve({ tasklistId, taskIds });
});

export const removeDestroyedTaskIds = createAction('REMOVE_DESTROYED_TASK_IDS', (resolve) => {
  return (taskIds: number[]) => resolve({ taskIds });
});
