import * as actionTypes from "../actions/cargo/actionTypes";

const initialState = {
  materials: [],
  total_materials_prices: 0.0,
  hours: null,
  total_hours_prices: 0.0,
  hour_price: 0.0,
  order: null,
  order_detail: null,
};

const cargoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MATERIALS:
      const materials = action.payload.materials;
      const total_materials_prices = action.payload.total_materials_prices;
      return {
        ...state,
        materials,
        total_materials_prices,
      };
    case actionTypes.SET_HOURS:
      const hours = action.payload.hours;
      const total_hours_prices = action.payload.total_hours_prices;
      const hour_price = action.payload.hour_price;
      return {
        ...state,
        hours,
        total_hours_prices,
        hour_price,
      };
    case actionTypes.SET_ORDER:
      const order = action.payload.order;
      const order_detail = action.payload.order_detail;
      return {
        ...state,
        order,
        order_detail
      };
    case actionTypes.SET_RESET:
      return initialState;
    default:
      return state;
  }
};

export default cargoReducer;
