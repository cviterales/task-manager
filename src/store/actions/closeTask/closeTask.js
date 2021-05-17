import { getTeamMaterials } from "../../../api/index"
import * as actionTypes from "./actionTypes"

export const removeTaskRecoveredEquipment = (payload) => {
  return {
    type: actionTypes.REMOVE_TASK_RECOVERED_EQUIPMENT,
    payload: payload,
  }
}

export const setTaskRecoveredEquipment = (payload) => {
  return {
    type: actionTypes.SET_TASK_RECOVERED_EQUIPMENT,
    payload: payload,
  }
}

export const setTaskNewEquipment = (payload) => {
  return {
    type: actionTypes.SET_TASK_MATERIAL_EQUIPMENT,
    payload: payload,
  }
}

export const setTaskUpdatedEquipment = (payload) => {
  return {
    type: actionTypes.SET_TASK_UPDATED_EQUIPMENT,
    payload: payload,
  }
}

export const setTaskDslam = (val) => {
  return {
    type: actionTypes.SET_TASK_DSLAM,
    payload: val,
  }
}

export const setTaskPort = (val) => {
  return {
    type: actionTypes.SET_TASK_PORT,
    payload: val,
  }
}

export const setTaskNode = (val) => {
  return {
    type: actionTypes.SET_TASK_NODE,
    payload: val,
  }
}

export const setTaskOlt = (val) => {
  return {
    type: actionTypes.SET_TASK_OLT,
    payload: val,
  }
}

export const resetSteps = () => {
  return {
    type: actionTypes.RESET_FORM_STEP,
  }
}

export const updateStep = (val) => {
  return {
    type: actionTypes.SET_FORM_STEP,
    payload: val,
  }
}

const addMaterials = (materials) => ({ type: actionTypes.GET_TASK_MATERIALS, payload: materials })

export const getMaterials = (id_deposit) => {
  return async (dispatch) => {
    const res = await getTeamMaterials(id_deposit)
    let materials = res.filter((el) => el.equipment === 0)
    let equipment = res.filter((el) => el.equipment === 1)
    let availableMaterials = { materials, equipment }
    dispatch(addMaterials(availableMaterials))
  }
}

export const setTechnicalData = (data) => {
  return {
    type: actionTypes.SET_TASK_TECHNICAL_DATA,
    payload: data,
  }
}

export const setDescription = (description) => {
  return {
    type: actionTypes.SET_TASK_DESCRIPTION,
    payload: description,
  }
}

export const setMaterials = (material) => {
  return {
    type: actionTypes.SET_TASK_MATERIALS,
    payload: material,
  }
}

export const updateMaterials = (material) => {
  return {
    type: actionTypes.UPDATE_TASK_MATERIALS,
    payload: material,
  }
}
