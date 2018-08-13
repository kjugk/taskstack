import { createAction } from 'typesafe-actions';

export const verify = createAction('user/VERIFY', (resolve) => {
  return () => resolve();
});

// TODO: define entity
export const verifySuccess = createAction('user/VERIFY_SUCCESS', (resolve) => {
  return (user: any) => resolve({ user });
});

export const verifyFailure = createAction('user/VERIFY_FAILURE', (resolve) => {
  return () => resolve();
});

export const signOut = createAction('user/SIGN_OUT', (resolve) => {
  return () => resolve();
});

export const signOutSuccess = createAction('user/SIGN_OUT_SUCCESS', (resolve) => {
  return () => resolve();
});
