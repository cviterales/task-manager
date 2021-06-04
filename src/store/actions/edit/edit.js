import * as actionTypes from "./actionTypes"

export const setEditMode = (payload) => {
  return {
    type: actionTypes.SET_EDIT_MODE,
    payload: payload,
  }
}

export const setEditData = (payload) => {
  return {
    type: actionTypes.SET_EDIT_DATA,
    payload: payload,
  }
}
