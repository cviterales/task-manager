import { getSubAccountData } from "../../../api"
import * as actionTypes from "./actionTypes"

export const getAccountData = (id_service, id_account) => {
  return async (dispatch) => {
    let res = await getSubAccountData(id_service, id_account)
    dispatch({ type: actionTypes.GET_ACCOUNT, payload: res })
  }
}

export const setAccountData = (account) => {
  return {type: actionTypes.SET_ACCOUNT, payload: account}
}
