import { createAction } from 'typesafe-actions';

export const verify = createAction('user/VERIFY_START', (resolve) => {
  return () => resolve();
});

export const verifySuccess = createAction('user/VERIFY_SUCCESS', (resolve) => {
  return (user: any) => resolve({ user });
});

export const verifyFailure = createAction('user/VERIFY_FAILURE', (resolve) => {
  return () => resolve();
});

export const signOut = createAction('user/SIGN_OUT_START', (resolve) => {
  return () => resolve();
});

export const signOutSuccess = createAction('user/SIGN_OUT_SUCCESS', (resolve) => {
  return () => resolve();
});
