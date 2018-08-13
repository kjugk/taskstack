import * as types from '../../types';
import { getType, ActionType } from 'typesafe-actions';
import * as formActions from '../../actions/taskCreateFormActions';
export type TaskCreateFormAction = ActionType<typeof formActions>;

const initialState: types.TaskCreateFormState = {
  title: '',
  isSubmitting: false
};

const taskCreateForm = (state = initialState, action: TaskCreateFormAction) => {
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

    case getType(formActions.clear):
      return initialState;

    default:
      return state;
  }
};

export { taskCreateForm };
