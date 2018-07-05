import * as constants from '../constants';
// import * as types from '../types';

const initialState = {
  items: {},
  isFetching: false
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
        items: action.payload.items,
        isFetching: false
      };
  }
};

export { tasklistList };
