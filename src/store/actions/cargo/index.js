import * as actionTypes from "./actionTypes";

export const setMaterials = (materials, totalMaterialsPrices) => {
  return {type: actionTypes.ADD_MATERIALS, payload: {materials, totalMaterialsPrices}}
}

export const setHours = (hours, totalHoursPrices, hourPrice) => {
  return {type: actionTypes.ADD_HOURS, payload: {hours, totalHoursPrices, hourPrice}}
}