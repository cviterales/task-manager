import { SET_EDIT_DATA, SET_EDIT_MODE } from "../actions/edit/actionTypes"

const initialState = {
  editMode: null,
  editData: null,
}

const editReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      }
    case SET_EDIT_DATA:
      return {
        ...state,
        editData: action.payload,
      }
    default:
      return state
  }
}

export default editReducer;