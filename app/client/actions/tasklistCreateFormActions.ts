import * as constants from '../constants';

export const activate = () => {
  return {
    type: constants.TASKLIST_CREATE_FORM_ACTIVATE,
    payload: {}
  };
};

export const close = () => {
  return {
    type: constants.TASKLIST_CREATE_FORM_CLOSE,
    payload: {}
  };
};

export const changeTitle = (title: string) => {
  return {
    type: constants.TASKLIST_TITLE_CHANGE,
    payload: { title }
  };
};
