import * as actionTypes from "./actionTypes";

export const add_materials = (materials, totalMaterialsPrices) => {
  return {type: actionTypes.ADD_MATERIALS, payload: {materials, totalMaterialsPrices}}
}

export const add_hours = (hours, totalHoursPrices) => {
  return {type: actionTypes.ADD_HOURS, payload: {hours, totalHoursPrices}}
}