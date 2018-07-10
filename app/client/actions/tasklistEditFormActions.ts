import * as constants from '../constants';

export const close = () => {
  return {
    type: constants.TASKLIST_EDIT_FORM_CLOSE,
    payload: {}
  };
};

export const changeTitle = (title: string) => {
  return {
    type: constants.TASKLIST_EDIT_FORM_TITLE_CHANGE,
    payload: { title }
  };
};

export const submit = (id: number, params: object) => {
  return {
    type: constants.TASKLIST_EDIT_FORM_SUBMIT,
    payload: {
      id,
      params
    }
  };
};
