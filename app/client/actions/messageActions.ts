import * as constants from '../constants';

export const setMessage = (message: string) => {
  return {
    type: constants.MESSAGE_SET,
    payload: {
      message
    }
  };
};
