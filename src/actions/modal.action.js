export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModalAct = (data) => {
  return {
    type: OPEN_MODAL,
    payload: data,
  };
};

export const closeModalAct = () => {
  return {
    type: CLOSE_MODAL,
  };
};
