import { createAction } from 'typesafe-actions';

export const fetchTasks = createAction('tasks/FETCH', (resolve) => {
  return (tasklistId: number) => resolve({ tasklistId });
});

export const receiveTasks = createAction('tasks/FETCH_SUCCESS', (resolve) => {
  return (tasklistId: number, tasksById: any) => resolve({ tasklistId, tasksById });
});

export const receiveNewTask = createAction('tasks/CREATE_SUCCESS', (resolve) => {
  return (task: any) => resolve({ task });
});

export const updateTask = createAction('TASK_UPDATE', (resolve) => {
  return (id: number, params: any) => resolve({ id, params });
});

export const receiveUpdatedTask = createAction('TASK_UPDATE_SUCCESS', (resolve) => {
  return (task: any) => resolve({ task });
});

export const destroyTask = createAction('TASK_DESTROY', (resolve) => {
  return (id: number) => resolve({ id });
});

export const receiveDestroyedTaskId = createAction('TASK_DESTROY_SUCCESS', (resolve) => {
  return (id: number) => resolve({ id });
});

export const updateSort = createAction('TASK_SORT_UPDATE', (resolve) => {
  return (tasklistId: number, taskIds: number[]) => resolve({ tasklistId, taskIds });
});

export const receiveDestroyedTaskIds = createAction(
  'COMPLETED_TASKS_DESTROY_SUCCESS',
  (resolve) => {
    return (taskIds: number[]) => resolve({ taskIds });
  }
);
