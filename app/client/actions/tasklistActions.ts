import { createAction } from 'typesafe-actions';

export const fetchTasklists = createAction('tasklist/FETCH_TASKLISTS', (resolve) => {
  return resolve;
});

export const fetchTasklistsSuccess = createAction('tasklist/FETCH_TASKLISTS_SUCCESS', (resolve) => {
  return (ids: number[], tasklistsById: any) => resolve({ ids, tasklistsById });
});

// TODO update に マージできないか?;
export const updateTaskSortSuccess = createAction(
  'tasklist/UPDATE_TASK_SORT_SUCCESS',
  (resolve) => {
    return (tasklistId: number, taskIds: number[]) => resolve({ tasklistId, taskIds });
  }
);

// TODO entity type を定義する。
export const createSuccess = createAction('tasklist/CREATE_SUCCESS', (resolve) => {
  return (id: number, tasklistById: any) => resolve({ id, tasklistById });
});

export const edit = createAction('tasklist/EDIT_START', (resolve) => {
  return (tasklist: any) => resolve({ tasklist });
});

export const updateSuccess = createAction('tasklist/UPDATE_SUCCESS', (resolve) => {
  return (tasklist: any) => resolve({ tasklist });
});

export const destroySuccess = createAction('tasklist/DESTROY_SUCCESS', (resolve) => {
  return (id: number) => resolve({ id });
});

export const fetchTasksSuccess = createAction('tasklist/FETCH_TASKS_SUCCESS', (resolve) => {
  return (tasklistId: number) => resolve({ tasklistId });
});

export const updateTaskCount = createAction('tasklist/UPDATE_TASK_COUNT', (resolve) => {
  return (tasklistId: number, taskCount: number) => resolve({ tasklistId, taskCount });
});

export const removeCompletedTaskIds = createAction(
  'tasklist/REMOVE_COMPLETED_TASK_IDS',
  (resolve) => {
    return (tasklistId: number, taskIds: number[]) => resolve({ tasklistId, taskIds });
  }
);
