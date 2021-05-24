import { CLOSE_MODAL, OPEN_MODAL } from "../actions/modal.action";

const initState = {
  title: null,
  body: null,
  style: null,
  isOpen: false,
};

export const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      let cloneState = { ...state };
      cloneState.isOpen = true;
      cloneState.title = action.payload.title;
      cloneState.body = action.payload.body;
      cloneState.style = action.payload.style;
      return cloneState;
    }
    case CLOSE_MODAL: {
      let cloneState = { ...state };
      cloneState.isOpen = false;
      cloneState.title = null;
      cloneState.body = null;
      cloneState.style = null;
      return cloneState;
    }
    default:
      return state;
  }
};
