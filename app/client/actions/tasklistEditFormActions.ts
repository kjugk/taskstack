import * as types from '../types';
import { createAction } from 'typesafe-actions';

export const init = createAction('tasklistEditForm/INIT', (resolve) => {
  return (tasklist: types.TasklistState) => resolve({ tasklist });
});

export const close = createAction('tasklistEditForm/CLOSE', (resolve) => {
  return resolve;
});

export const changeTitle = createAction('tasklistEditForm/TITLE_CHANGE', (resolve) => {
  return (title: string) => resolve({ title });
});

export const submit = createAction('tasklistEditForm/SUBMIT', (resolve) => {
  return (id: number, params: object) => resolve({ id, params });
});

export const destroyTasklist = createAction('tasklistEditForm/DESTROY', (resolve) => {
  return (id: number) => resolve({ id });
});

export const complete = createAction('tasklistEditForm/SUBMIT_COMPLETE', (resolve) => {
  return resolve;
});
