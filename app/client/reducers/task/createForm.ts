import * as constants from '../../constants';
import * as types from '../../types';

const initialState: types.TaskCreateFormState = {
  title: '',
  isSubmitting: false
};

const taskCreateForm = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASK_TITLE_CHANGE:
      return {
        ...state,
        title: action.payload.title
      };

    case constants.TASK_CREATE_FORM_SUBMIT:
      return {
        ...state,
        isSubmitting: true
      };

    case constants.TASK_CREATE_FORM_CLEAR:
      return initialState;

    default:
      return state;
  }
};

export { taskCreateForm };
