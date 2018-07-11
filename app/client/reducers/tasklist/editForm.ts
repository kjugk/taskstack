import * as constants from '../../constants';
import * as types from '../../types';

const initialState: types.TasklistEditFormState = {
  active: false,
  id: -1,
  isSubmitting: false,
  title: ''
};

const tasklistEditForm = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKLIST_EDIT_START:
      return {
        ...state,
        ...action.payload.tasklist,
        active: true
      };

    case constants.TASKLIST_EDIT_FORM_TITLE_CHANGE:
      return {
        ...state,
        title: action.payload.title
      };

    case constants.TASKLIST_EDIT_FORM_SUBMIT:
    case constants.TASKLIST_DESTROY:
      return {
        ...state,
        isSubmitting: true
      };

    case constants.TASKLIST_EDIT_FORM_CLOSE:
      return initialState;

    default:
      return state;
  }
};

export { tasklistEditForm };
