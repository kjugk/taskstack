import * as constants from '../constants';
import * as types from '../types';

const initialState: types.TasklistListState = {
  ids: [],
  tasklistsById: {},
  isFetching: false,
  isInitialized: false,
  selectedId: -1
};

const tasklistList = (state = initialState, action: any) => {
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
        tasklistsById: action.payload.tasklistsById,
        isFetching: false,
        isInitialized: true
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
          ...action.payload.tasklist
        }
      };

    case constants.TASKLIST_DESTROY_SUCCESS:
      return {
        ...state,
        ids: state.ids.filter((id) => id !== action.payload.id),
        tasklistsById: destroyTasklistById(action.payload.id, state.tasklistsById)
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
  delete tasklistsById[id];
  return tasklistsById;
};

// selector
const getTaskLists = ({ ids, tasklistsById }: types.TasklistListState) => {
  return ids.map((id) => tasklistsById[id]);
};

const getSelectedTaskList = ({ selectedId, tasklistsById }: types.TasklistListState) => {
  return tasklistsById[selectedId];
};

export { tasklistList, getTaskLists, getSelectedTaskList };
