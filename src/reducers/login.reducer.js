import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REQUEST_LOGIN,
} from "../actions/login.action";

const initialState = {
  requesting: false,
  success: false,
  message: null,
  data: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN: {
      return {
        ...state,
        requesting: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        requesting: false,
        data: action.payload.data,
        message: null,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        requesting: false,
        message: action.payload,
        data: null,
      };
    }
    case "LOGOUT": {
      return initialState;
    }
    default:
      return state;
  }
};
