import * as actionTypes from "./actionTypes";

export const setMessage = (message, error) => {
  return {
    type: actionTypes.SET_TOAST_MESSAGE,
    payload: { message: message, error: error },
  };
};
