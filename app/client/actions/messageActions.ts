import { createAction } from 'typesafe-actions';

export const setMessage = createAction('message/SET', (resolve) => {
  return (message: string) => resolve(message);
});
