import { createAction } from 'typesafe-actions';

export const setMessage = createAction('MESSAGE_SET', (resolve) => {
  return (message: string) => resolve(message);
});
