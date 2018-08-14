import * as constants from '../../constants';
import * as types from '../../types';
import { getType, ActionType } from 'typesafe-actions';
import * as formActions from '../../actions/tasklistEditFormActions';

export type TasklistEditFormAction = ActionType<typeof formActions>;

const initialState: types.TasklistEditFormState = {
  id: -1,
  isSubmitting: false,
  isSubmitted: false,
  title: ''
};

const tasklistEditForm = (state = initialState, action: TasklistEditFormAction) => {
  switch (action.type) {
    case getType(formActions.init):
      return {
        ...state,
        ...action.payload.tasklist
      };

    case getType(formActions.changeTitle):
      return {
        ...state,
        title: action.payload.title
      };

    case getType(formActions.submit):
    case getType(formActions.destroyTasklist):
      return {
        ...state,
        isSubmitting: true
      };

    case getType(formActions.complete):
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true
      };

    case getType(formActions.close):
      return initialState;

    default:
      return state;
  }
};

export { tasklistEditForm };
