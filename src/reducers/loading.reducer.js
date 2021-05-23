import { LOADING_FALSE, LOADING_TRUE } from "../actions/loading.action";

const initState = false;

export const loadingReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_TRUE: {
      return true;
    }
    case LOADING_FALSE: {
      return false;
    }
    default:
      return state;
  }
};
