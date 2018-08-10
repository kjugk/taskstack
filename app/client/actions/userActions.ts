import * as constants from '../constants';

export const verify = () => {
  return {
    type: constants.USER_VERIFY,
    payload: {}
  };
};

export const signOut = () => {
  return {
    type: constants.USER_SIGN_OUT,
    payload: {}
  };
};

export const signOutSuccess = () => {
  return {
    type: constants.USER_SIGN_OUT_SUCCESS,
    payload: {}
  };
};

export const receiveVerifiedUser = (user: any) => {
  return {
    type: constants.USER_VERIFY_SUCCESS,
    payload: {
      ...user
    }
  };
};

export const failVefirication = () => {
  return {
    type: constants.USER_VERIFY_FAILURE,
    payload: {}
  };
};
