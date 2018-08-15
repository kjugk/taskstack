import { createAction } from 'typesafe-actions';

export const setChangedTitle = createAction('taskCreateForm/SET_CHANGED_TITLE', (resolve) => {
  return (title: string) => resolve({ title });
});

export const submit = createAction('taskCreateForm/SUBMIT', (resolve) => {
  return (tasklistId: number, params: any) => resolve({ tasklistId, params });
});

export const clear = createAction('taskCreateForm/CLEAR', (resolve) => {
  return () => resolve();
});
