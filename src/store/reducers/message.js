import * as actionTypes from "../actions/message/actionTypes";


const initialState = {
  message: "",
  error: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOAST_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
      }
    default:
      return state;
  }
};

export default messageReducer;
