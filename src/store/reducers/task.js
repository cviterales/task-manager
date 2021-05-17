import * as actionTypes from "../actions/task/actionTypes"

let initialState = {
  task: null,
}

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TASK:
      return {
        ...state,
        task: action.payload,
      }
    default:
      return state
  }
}

export default taskReducer
