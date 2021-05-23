import { random } from "../general/helper";

export const ADD_ALERT = "ADD_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";

export const addAlert = (title, status) => {
  let id = random(4);
  return {
    type: ADD_ALERT,
    content: {
      id: id,
      title: title,
      status: status,
    },
  };
};
export const removeAlert = (id) => {
  return {
    id: id,
    type: REMOVE_ALERT,
  };
};
export const clearAlert = () => {
  return {
    type: CLEAR_ALERT,
  };
};
