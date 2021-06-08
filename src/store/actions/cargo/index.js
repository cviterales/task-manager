import * as actionTypes from "./actionTypes";
import {getOrderDetail} from '../../../api/index';

export const setMaterials = (materials, total_materials_prices) => {
  return {type: actionTypes.SET_MATERIALS, payload: {materials, total_materials_prices}}
}

export const setHours = (hours, total_hours_prices, hour_price) => {
  return {type: actionTypes.SET_HOURS, payload: {hours, total_hours_prices, hour_price}}
}

export const setOrder = (order) => {
  const {id_service, id_order, with_cargo} = order;
  return dispatch => {
    getOrderDetail(id_service, id_order, with_cargo)
    .then(res => {
      const {with_cargo, with_hours} = order;

      if (with_cargo) {
        const {cargo_detail, materials} = res;
        const {total_materials, total_hours, hour_price } = cargo_detail;
        dispatch(setMaterials(materials, total_materials))
        dispatch(setHours(with_hours, total_hours, hour_price))
      }
      dispatch({type: actionTypes.SET_ORDER, payload: {order: order, order_detail: res}})
    })
    .catch((err) => console.log(err));
  }

}

export const setReset = () => {
  return {type: actionTypes.SET_RESET}
}

