import * as constants from '../constants';
import * as types from '../types';

import { getSelectedTaskList } from '../reducers/tasklistList';

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

    case constants.TASK_CREATE_SUCCESS:
      return {
        ...state,
        tasksById: {
          ...state.tasksById,
          ...action.payload.task
        }
      };

    default:
      return state;
  }
};

// selector
const getTasks = (state: types.RootState) => {
  const tasklist = getSelectedTaskList(state.tasklistList);
  const { tasksById } = state.tasks;

  if (tasklist === undefined) return [];

  return (tasklist.taskIds || []).map((id: any) => tasksById[id]);
};

export { tasks, getTasks };
