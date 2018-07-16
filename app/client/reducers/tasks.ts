import * as constants from '../constants';
import * as types from '../types';
import { createSelector } from 'reselect';
import { getSelectedTasklist } from '../reducers/tasklistList';

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

    case constants.TASK_UPDATE_SUCCESS:
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
const getTasksById = (state: types.RootState) => {
  return state.tasks.tasksById;
};

const getTasks = createSelector([getSelectedTasklist, getTasksById], (tasklist, tasksById) => {
  if (tasklist === undefined) return [];

  let res: types.TaskState[] = [];
  (tasklist.taskIds || []).forEach((id: any) => {
    if (tasksById[id]) {
      res.push(tasksById[id]);
    }
  });

  return res;
});

const getActiveTasks = createSelector([getTasks], (tasks) => {
  return tasks.filter((task) => !task.completed);
});

const getCompletedTasks = createSelector([getTasks], (tasks) => {
  return tasks.filter((task) => task.completed);
});

export { tasks, getActiveTasks, getCompletedTasks };
