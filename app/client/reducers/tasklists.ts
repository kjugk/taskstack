import * as constants from '../constants';
import * as types from '../types';
import { createSelector } from 'reselect';
import _ from 'lodash';

const initialState: types.TasklistsState = {
  ids: [],
  isFetching: false,
  isInitialized: false,
  selectingId: undefined,
  tasklistsById: {}
};

export const tasklists = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKLISTS_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case constants.TASKLISTS_FETCH_SUCCESS:
      return {
        ...state,
        ids: action.payload.ids,
        isFetching: false,
        isInitialized: true,
        tasklistsById: action.payload.tasklistsById
      };

    case constants.TASKLIST_CREATE_SUCCESS:
      return {
        ...state,
        ids: [action.payload.id, ...state.ids],
        tasklistsById: {
          ...action.payload.tasklistById,
          ...state.tasklistsById
        }
      };

    case constants.TASKLIST_UPDATE_SUCCESS:
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

    case constants.TASKLIST_DESTROY_SUCCESS:
      return {
        ...state,
        ids: state.ids.filter((id) => id !== action.payload.id),
        tasklistsById: destroyTasklistById(action.payload.id, state.tasklistsById)
      };

    case constants.TASK_IDS_RECEIVE:
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

    case constants.TASK_COUNT_UPDATE_SUCCESS:
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

    case constants.TASKS_FETCH_SUCCESS:
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
  const cloned = _.cloneDeep(tasklistsById);
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
    return tasklistById[tasklistId];
  }
);