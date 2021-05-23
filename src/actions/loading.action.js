export const LOADING_TRUE = "LOADING_TRUE";
export const LOADING_FALSE = "LOADING_FALSE";

export const loadingAct = (status) => {
  if (status) {
    return {
      type: LOADING_TRUE,
    };
  } else {
    return {
      type: LOADING_FALSE,
    };
  }
};
