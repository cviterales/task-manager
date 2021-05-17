import { getTask } from "../../../api"
import * as actionTypes from "./actionTypes"

export const getTaskData = (id_service, id_task) => {
  return async (dispatch) => {
    let res = await getTask(id_service, id_task)
    dispatch({ type: actionTypes.GET_TASK, payload: res })
  }
}
