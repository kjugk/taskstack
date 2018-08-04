import * as constants from '../constants';

export const close = () => {
  return {
    type: constants.TASKLIST_CREATE_FORM_CLOSE,
    payload: {}
  };
};

export const changeTitle = (title: string) => {
  return {
    type: constants.TASKLIST_CREATE_FORM_TITLE_CHANGE,
    payload: { title }
  };
};

export const submit = (params: object) => {
  return {
    type: constants.TASKLIST_CREATE_FORM_SUBMIT,
    payload: {
      params
    }
  };
};

export const complete = () => {
  return {
    type: constants.TASKLIST_CREATE_FORM_SUBMIT_SUCCESS,
    payload: {}
  };
};
