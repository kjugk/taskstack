import { createAction } from 'typesafe-actions';

export const fetchTasklists = createAction('tasklists/FETCH_TASK_LISTS', (resolve) => {
  return resolve;
});

export const setTasklists = createAction('tasklists/SET_TASK_LISTS', (resolve) => {
  return (ids: number[], tasklistsById: any) => resolve({ ids, tasklistsById });
});

// TODO update に マージできないか?;
export const setTaskIds = createAction('tasklist/TASK_IDS_RECEIVE', (resolve) => {
  return (tasklistId: number, taskIds: number[]) => resolve({ tasklistId, taskIds });
});

// TODO entity type を定義する。
export const setCreatedTasklist = createAction('tasklist/RECEIVE', (resolve) => {
  return (id: number, tasklistById: any) => resolve({ id, tasklistById });
});

export const editTasklist = createAction('tasklist/EDIT', (resolve) => {
  return (tasklist: any) => resolve({ tasklist });
});

export const setUpdatedTasklist = createAction('tasklist/UPDATE_SUCCESS', (resolve) => {
  return (tasklist: any) => resolve({ tasklist });
});

export const setDestroyedTasklistId = createAction('tasklist/DESTROY_SUCCESS', (resolve) => {
  return (id: number) => resolve({ id });
});

export const setTaskCount = createAction('tasklist/TASK_COUNT_UPDATE_SUCCESS', (resolve) => {
  return (tasklistId: number, taskCount: number) => resolve({ tasklistId, taskCount });
});

export const setTaskLoadedFlag = createAction('tasklist/FETCH_TASKS_SUCCESS', (resolve) => {
  return (tasklistId: number) => resolve({ tasklistId });
});

export const removeCompletedTaskIds = createAction(
  'tasklist/COMPLETED_TASKS_DESTROY',
  (resolve) => {
    return (tasklistId: number, taskIds: number[]) => resolve({ tasklistId, taskIds });
  }
);
