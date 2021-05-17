import * as actionTypes from "../actions/account/actionTypes"

let initialState = {
  account: null,
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      }
    default:
      return state
  }
}

export default accountReducer
