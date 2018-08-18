import { createAction } from 'typesafe-actions';

export const open = createAction('sidebar/OPEN', (resolve) => {
  return () => resolve();
});

export const close = createAction('sidebar/CLOSE', (resolve) => {
  return () => resolve();
});
