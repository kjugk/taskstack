import * as constants from '../../../constants';
import * as types from '../../../types';

const initialState: types.TasklistCreateForm = {
  active: false,
  title: ''
};

const tasklistCreateForm = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKLIST_CREATE_START:
      return {
        ...state,
        active: true
      };

    case constants.TASKLIST_TITLE_CHANGE:
      return {
        ...state,
        title: action.payload.title
      };

    default:
      return state;
  }
};

export { tasklistCreateForm };
