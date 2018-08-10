import * as constants from '../constants';

const initialState = {
  initialized: false,
  signedIn: false,
  name: '',
  imageUrl: ''
};

const user = (state = initialState, action: any) => {
  switch (action.type) {
    case constants.USER_VERIFY_SUCCESS:
      return {
        ...state,
        initialized: true,
        signedIn: true,
        name: action.payload.name,
        imageUrl: action.payload.imageUrl
      };

    case constants.USER_SIGN_OUT_SUCCESS:
      return {
        ...state,
        signedIn: false
      };

    case constants.USER_VERIFY_FAILURE:
      return {
        ...state,
        initialized: true
      };

    default:
      return state;
  }
};

export { user };
