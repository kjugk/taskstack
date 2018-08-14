import * as types from '../../types';
import { getType, ActionType } from 'typesafe-actions';
import * as formActions from '../../actions/tasklistCreateFormActions';
export type TasklistCreateFormAction = ActionType<typeof formActions>;

const initialState: types.TasklistCreateFormState = {
  title: '',
  isSubmitting: false,
  isSubmitted: false
};

const tasklistCreateForm = (state = initialState, action: TasklistCreateFormAction) => {
  switch (action.type) {
    case getType(formActions.changeTitle):
      return {
        ...state,
        title: action.payload.title
      };

    case getType(formActions.submit):
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

export { tasklistCreateForm };
