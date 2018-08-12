import * as constants from '../constants';

export const open = () => ({
  type: constants.SIDEBAR_OPEN,
  payload: {}
});

export const close = () => ({
  type: constants.SIDEBAR_CLOSE,
  payload: {}
});
