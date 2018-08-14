import { createAction } from 'typesafe-actions';

export const close = createAction('tasklistCreateForm/CLOSE', (resolve) => {
  return () => resolve();
});

export const changeTitle = createAction('tasklistCreateForm/TITLE_CHANGE', (resolve) => {
  return (title: string) => resolve({ title });
});

export const submit = createAction('tasklistCreateForm/SUBMIT', (resolve) => {
  return (params: object) => resolve({ params });
});

export const complete = createAction('tasklistCreateForm/COMPLETE', (resolve) => {
  return () => resolve();
});
