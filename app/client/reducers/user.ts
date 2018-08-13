import { ActionType, getType } from 'typesafe-actions';
import * as userActions from '../actions/userActions';
export type UserAction = ActionType<typeof userActions>;

const initialState = {
  initialized: false,
  signedIn: false,
  name: '',
  imageUrl: ''
};

const user = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case getType(userActions.verifySuccess):
      return {
        ...state,
        initialized: true,
        signedIn: true,
        ...action.payload.user
      };

    case getType(userActions.signOutSuccess):
      return {
        ...state,
        signedIn: false
      };

    case getType(userActions.verifyFailure):
      return {
        ...state,
        initialized: true
      };

    default:
      return state;
  }
};

export { user };
