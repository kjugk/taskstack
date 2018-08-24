import { createAction } from 'typesafe-actions';

export const notifyUnknownError = createAction('app/NOTIFY_UNKNOWN_ERROR', (resolve) => {
  return resolve;
});

export const clearError = createAction('app/CLEAR_ERROR', (resolve) => {
  return resolve;
});
