import * as actionTypes from "../actions/cargo/actionTypes";

const initialState = {
  materials: [],
  totalMaterialsPrices: 0.00,
  hours: null,
  totalHoursPrices: 0.00,
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
      const hours = action.payload.hours;
      const totalHoursPrices = action.payload.totalHoursPrices;
      return {
        ...state,
        hours,
        totalHoursPrices,
      };
    default:
      return state;
  }
};

export default cargoReducer;
