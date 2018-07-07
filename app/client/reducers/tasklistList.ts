import * as constants from '../constants';
import * as types from '../types';

const initialState: types.TasklistListState = {
  tasklistsById: {
    1: {
      id: 1,
      title: "foo"
    },
    2: {
      id: 2,
      title: "bar"
    }
  },
  selectedId: -1,
  isFetching: false,
  isInitialized: false
};

const tasklistList = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.TASKLIST_LIST_FETCH:
      return {
        ...state,
        isFetching: true
      };

    case constants.TASKLIST_LIST_FETCH_SUCCESS:
      return {
        ...state,
        tasklistsById: action.payload.tasklistsById,
        isFetching: false,
        isInitialized: true
      };

    case constants.TASKLIST_CREATE_SUCCESS:
      return {
        ...state,
        tasklistsById: {
          ...{[action.payload.entity.id]: action.payload.entity},
          ...state.tasklistsById,
        }
      };

    default:
      return state;
  }
};

const getTaskLists = ({ tasklistsById }: types.TasklistListState) => {
  return Object.keys(tasklistsById).map((id: any) => tasklistsById[id]);
};

const getSelectedTaskList = ({ selectedId, tasklistsById }: types.TasklistListState) => {
  return tasklistsById[selectedId]
};

export { tasklistList, getTaskLists, getSelectedTaskList };
