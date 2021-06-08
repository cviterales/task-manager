import * as actionTypes from "../actions/cargo/actionTypes";

const initialState = {
  materials: [],
  totalMaterialsPrices: 0.00,
  hours: "",
  totalHoursPrices: 0.00,
  hourPrice: 0.00,
};

const cargoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MATERIALS:
      const materials = action.payload.materials;
      const totalMaterialsPrices = action.payload.totalMaterialsPrices;
      return {
        ...state,
        materials,
        totalMaterialsPrices,
      };
    case actionTypes.ADD_HOURS:
      const hours = !state.hours.length ? action.payload.hours : 0;
      const totalHoursPrices = state.totalHoursPrices === 0 ? action.payload.totalHoursPrices : 0;
      const hourPrice = action.payload.hourPrice;
      return {
        ...state,
        hours,
        totalHoursPrices,
        hourPrice,
      };
    default:
      return state;
  }
};

export default cargoReducer;
