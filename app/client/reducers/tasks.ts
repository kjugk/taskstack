import * as constants from '../constants';
import * as types from '../types';

const initialState: types.TasksState = {
  isFetching: false,
  tasksById: {}
};

const tasks = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKS_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case constants.TASKS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        tasksById: action.payload.tasksById
      };

    default:
      return state;
  }
};

// selector
const getTasks = (state: types.RootState) => {
  const { tasksById } = state.tasks;
  return Object.keys(tasksById).map((id: any) => tasksById[id]);
};

export { tasks, getTasks };
