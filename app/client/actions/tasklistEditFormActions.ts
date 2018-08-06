import * as constants from '../constants';
import * as types from '../types';

export const init = (tasklist: types.TasklistState) => {
  return {
    type: constants.TASKLIST_EDIT_START,
    payload: {
      tasklist
    }
  };
};

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

export const destroyTasklist = (id: number) => {
  return {
    type: constants.TASKLIST_DESTROY,
    payload: {
      id
    }
  };
};

export const complete = () => {
  return {
    type: constants.TASKLIST_EDIT_FORM_SUBMIT_COMPLETE,
    payload: {}
  };
};
