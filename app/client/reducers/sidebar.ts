import * as types from '../types';
import { ActionType, getType } from 'typesafe-actions';
import * as sidebarActions from '../actions/sidebarActions';
type SidebarAction = ActionType<typeof sidebarActions>;

const initialState: types.SidebarState = {
  isOpen: false
};

export const sidebar = (state = initialState, action: SidebarAction) => {
  switch (action.type) {
    case getType(sidebarActions.open):
      return {
        ...state,
        isOpen: true
      };

    case getType(sidebarActions.close):
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
};
