import * as constants from '../constants';
import * as types from '../types';

const initialState: types.SidebarState = {
  isOpen: false
};

export const sidebar = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.SIDEBAR_OPEN:
      return {
        ...state,
        isOpen: true
      };

    case constants.SIDEBAR_CLOSE:
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
};
