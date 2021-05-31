import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
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
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        requesting: false,
        data: action.payload.user,
        message: null,
      };
    }
    case LOGIN_FAIL: {
      localStorage.removeItem("token");
      return {
        ...state,
        requesting: false,
        message: action.payload,
        data: null,
      };
    }
    case LOGOUT: {
      localStorage.removeItem("token");
      return initialState;
    }
    default:
      return state;
  }
};
