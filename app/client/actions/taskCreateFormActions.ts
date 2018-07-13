import * as constants from '../constants';

export const changeTitle = (title: string) => {
  return {
    type: constants.TASK_TITLE_CHANGE,
    payload: {
      title
    }
  };
};

export const submit = (tasklistId: number, params: any) => {
  return {
    type: constants.TASK_CREATE_FORM_SUBMIT,
    payload: {
      tasklistId,
      params
    }
  };
};

export const clear = () => {
  return {
    type: constants.TASK_CREATE_FORM_CLEAR,
    payload: {}
  };
};
