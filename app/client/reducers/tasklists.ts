import * as types from '../types';
import { createSelector } from 'reselect';
import { getType, ActionType } from 'typesafe-actions';
import * as tasklistActions from '../actions/tasklistActions';
export type TasklistAction = ActionType<typeof tasklistActions>;

const initialState: types.TasklistsState = {
  ids: [],
  isFetching: false,
  isInitialized: false,
  tasklistsById: {}
};

export const tasklists = (state = initialState, action: TasklistAction) => {
  switch (action.type) {
    case getType(tasklistActions.fetchTasklists):
      return {
        ...state,
        isFetching: true
      };

    case getType(tasklistActions.fetchTasklistsSuccess):
      return {
        ...state,
        ids: action.payload.ids,
        isFetching: false,
        isInitialized: true,
        tasklistsById: action.payload.tasklistsById
      };

    case getType(tasklistActions.createSuccess):
      return {
        ...state,
        ids: [action.payload.id, ...state.ids],
        tasklistsById: {
          ...action.payload.tasklistById,
          ...state.tasklistsById
        }
      };

    case getType(tasklistActions.updateSuccess):
      return {
        ...state,
        tasklistsById: {
          ...state.tasklistsById,
          [action.payload.tasklist.id]: {
            ...state.tasklistsById[action.payload.tasklist.id],
            ...action.payload.tasklist
          }
        }
      };

    case getType(tasklistActions.destroySuccess):
      return {
        ...state,
        ids: state.ids.filter((id) => id !== action.payload.id),
        tasklistsById: destroyTasklistById(action.payload.id, state.tasklistsById)
      };

    case getType(tasklistActions.sortTasklistSuccess):
      return {
        ...state,
        ids: action.payload.ids
      };

    case getType(tasklistActions.sortTaskSuccess):
      return {
        ...state,
        tasklistsById: {
          ...state.tasklistsById,
          [action.payload.tasklistId]: {
            ...state.tasklistsById[action.payload.tasklistId],
            taskIds: action.payload.taskIds
          }
        }
      };

    case getType(tasklistActions.updateTaskCount):
      return {
        ...state,
        tasklistsById: {
          ...state.tasklistsById,
          [action.payload.tasklistId]: {
            ...state.tasklistsById[action.payload.tasklistId],
            taskCount: action.payload.taskCount
          }
        }
      };

    case getType(tasklistActions.fetchTasksSuccess):
      return {
        ...state,
        tasklistsById: {
          ...state.tasklistsById,
          [action.payload.tasklistId]: {
            ...state.tasklistsById[action.payload.tasklistId],
            taskLoaded: true
          }
        }
      };

    default:
      return state;
  }
};

// helper
/**
 * tasklist を格納している object から、id で指定された tasklist を削除する。
 * @param id 削除対象id
 * @param tasklistsById tasklist を格納している object
 */
const destroyTasklistById = (id: number, tasklistsById: { [index: number]: any }) => {
  const cloned = Object.assign({}, tasklistsById);
  delete cloned[id];

  return cloned;
};

// selectors
const getTasklistIds = (state: types.RootState) => {
  return state.tasklists.ids;
};

const getTasklistsById = (state: types.RootState) => {
  return state.tasklists.tasklistsById;
};

// url params から tasklistId を抽出して返す。
const getTasklistId = (state: types.RootState, props: any) => {
  const { match } = props;
  if (match.params.tasklistId) {
    return parseInt(props.match.params.tasklistId, 10);
  } else {
    return -1;
  }
};

export const getTasklists = createSelector(
  [getTasklistIds, getTasklistsById],
  (ids, tasklistsById) => {
    return ids.map((id) => tasklistsById[id]);
  }
);

export const getTasklist = createSelector(
  [getTasklistsById, getTasklistId],
  (tasklistById, tasklistId) => {
    return tasklistById[tasklistId] || undefined;
  }
);
