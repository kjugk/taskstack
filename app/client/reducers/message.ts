import { ActionType, getType } from 'typesafe-actions';
import * as messages from '../actions/messageActions';
type MessageAction = ActionType<typeof messages>;

const initialState = {
  message: ''
};

const message = (state = initialState, action: MessageAction) => {
  switch (action.type) {
    case getType(messages.setMessage):
      return {
        ...state,
        message: action.payload
      };

    default:
      return state;
  }
};

export { message };
