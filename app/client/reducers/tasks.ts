import * as constants from '../constants';
import * as types from '../types';
import { createSelector } from 'reselect';

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
        tasksById: {
          ...state.tasksById,
          ...action.payload.tasksById
        }
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
          [action.payload.task.id]: {
            ...state.tasksById[action.payload.task.id],
            ...action.payload.task
          }
        }
      };

    case constants.TASK_DESTROY_SUCCESS:
      return {
        ...state,
        tasksById: deleteTask(state.tasksById, action.payload.id)
      };

    default:
      return state;
  }
};

// helpers
const deleteTask = (tasksById: any, id: number) => {
  // TODO deep copy (lodash?)
  const cloned = Object.assign({}, tasksById);

  delete cloned[id];
  return cloned;
};

// selectors
const getTasksById = (state: types.RootState) => {
  return state.tasks.tasksById;
};

export const getAllTasks = (tasklist: types.TasklistState | undefined) =>
  createSelector([getTasksById], (tasksById) => {
    if (tasklist === undefined) return [];

    const t: types.TaskState[] = [];
    (tasklist.taskIds || []).forEach((id: any) => {
      if (tasksById[id]) {
        t.push(tasksById[id]);
      }
    });

    return t;
  });

const getSelectingTask = (taskId: number) =>
  createSelector([getTasksById], (tasks) => {
    return tasks[taskId];
  });

export { tasks, getSelectingTask };
