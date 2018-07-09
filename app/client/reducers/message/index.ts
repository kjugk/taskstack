import * as constants from '../../constants';

const initialState = {
  message: ''
};

const message = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.MESSAGE_SET:
      console.log(action.payload.message);
      
      return {
        ...state,
        message: action.payload.message
      };

    default:
      return state;
  }
};

export { message };
