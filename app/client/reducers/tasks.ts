import * as constants from '../constants';
import * as types from '../types';
import { createSelector } from 'reselect';
import { getTasklist } from './tasklists';
import _ from 'lodash';

const initialState: types.TasksState = {
  isFetching: false,
  isUpdating: false,
  tasksById: {}
};

export const tasks = (state = initialState, action: any) => {
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

    case constants.COMPLETED_TASKS_DESTROY:
      return {
        ...state,
        isUpdating: true
      };

    case constants.COMPLETED_TASKS_DESTROY_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        tasksById: deleteTasks(state.tasksById, action.payload.taskIds)
      };

    default:
      return state;
  }
};

// helpers
const deleteTask = (tasksById: any, id: number) => {
  const cloned = _.cloneDeep(tasksById);
  delete cloned[id];

  return cloned;
};

const deleteTasks = (tasksById: any, ids: number[]) => {
  const cloned = _.cloneDeep(tasksById);
  ids.forEach((id) => delete cloned[id]);

  return cloned;
};

// selectors
const getTasksById = (state: types.RootState) => {
  return state.tasks.tasksById;
};

const getTaskId = (state: types.RootState, props: any) => {
  return parseInt(props.match.params.taskId, 10);
};

export const getActiveTasks = createSelector([getTasksById, getTasklist], (tasksById, tasklist) => {
  if (!tasklist) return [];

  return tasklist.taskIds.reduce(
    (acc, cur) => {
      if (tasksById[cur] && !tasksById[cur].completed) {
        acc.push(tasksById[cur]);
      }

      return acc;
    },
    [] as types.TaskState[]
  );
});

export const getCompletedTasks = createSelector(
  [getTasksById, getTasklist],
  (tasksById, tasklist) => {
    if (!tasklist) return [];

    return tasklist.taskIds.reduce(
      (acc, cur) => {
        if (tasksById[cur] && tasksById[cur].completed) {
          acc.push(tasksById[cur]);
        }

        return acc;
      },
      [] as types.TaskState[]
    );
  }
);

export const getTask = createSelector(
  [getTasksById, getTaskId],
  (tasksById: any, taskId: number) => {
    return tasksById[taskId];
  }
);
