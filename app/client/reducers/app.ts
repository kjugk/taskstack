import { AppState } from '../types';
import { ActionType, getType } from 'typesafe-actions';
import * as appActions from '../actions/appActions';
type AppAction = ActionType<typeof appActions>;

const initialState: AppState = {
  hasUnkownError: false
};

const app = (state = initialState, action: AppAction) => {
  switch (action.type) {
    case getType(appActions.notifyUnknownError):
      return {
        ...state,
        hasUnkownError: true
      };

    case getType(appActions.clearError):
      return {
        ...state,
        hasUnkownError: false
      };

    default:
      return state;
  }
};

export { app };
