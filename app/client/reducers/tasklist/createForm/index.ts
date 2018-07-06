import * as constants from '../../../constants';
import * as types from '../../../types';

const initialState: types.TasklistCreateFormState = {
  active: false,
  title: '',
  isSubmitting: false
};

const tasklistCreateForm = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKLIST_CREATE_FORM_ACTIVATE:
      return {
        ...state,
        active: true
      };

    case constants.TASKLIST_CREATE_FORM_CLOSE:
      return initialState;

    case constants.TASKLIST_TITLE_CHANGE:
      return {
        ...state,
        title: action.payload.title
      };

    case constants.TASKLIST_CREATE_FORM_SUBMIT:
      return {
        ...state,
        isSubmitting: true
      };

    default:
      return state;
  }
};

export { tasklistCreateForm };
