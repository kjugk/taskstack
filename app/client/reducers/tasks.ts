import * as types from '../types';
import { createSelector } from 'reselect';
import { getTasklist } from './tasklists';
import _ from 'lodash';
import { getType, ActionType } from 'typesafe-actions';
import * as taskActions from '../actions/taskActions';
export type TaskAction = ActionType<typeof taskActions>;

const initialState: types.TasksState = {
  isFetching: false,
  isUpdating: false,
  tasksById: {}
};

export const tasks = (state = initialState, action: TaskAction) => {
  switch (action.type) {
    case getType(taskActions.fetchTasks):
      return {
        ...state,
        isFetching: true
      };

    case getType(taskActions.setTasks):
      return {
        ...state,
        isFetching: false,
        tasksById: {
          ...state.tasksById,
          ...action.payload.tasksById
        }
      };

    case getType(taskActions.setCreatedTask):
      return {
        ...state,
        tasksById: {
          ...state.tasksById,
          ...action.payload.task
        }
      };

    case getType(taskActions.setUpdatedTask):
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

    case getType(taskActions.removeDestroyedTaskId):
      return {
        ...state,
        tasksById: deleteTask(state.tasksById, action.payload.id)
      };

    case getType(taskActions.removeDestroyedTaskIds):
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
