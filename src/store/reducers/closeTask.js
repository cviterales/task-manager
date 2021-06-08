import * as actionTypes from "../actions/closeTask/actionTypes";

const initialState = {
  id_node: false,
  fo: false,
  dslam: false,
  description: "",
  time_start: false,
  time_finish: false,
  equipment_updated: [],
  equipment_recovered: [],
  availableMaterials: false,
  materials: [],
  step: 1,
  technical_data: false,
  signature: "",
};

const closeTaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TECHNICAL_DATA_PAIR:
      return {
        ...state,
        technical_data: {
          ...state.technical_data,
          ...action.payload,
        },
      };

    case actionTypes.SET_TECHNICAL_DATA_PORT:
      return {
        ...state,
        technical_data: {
          ...state.technical_data,
          id_port: action.payload,
        },
      };
    case actionTypes.SET_TECHNICAL_DATA_BOX:
      return {
        ...state,
        technical_data: {
          ...state.technical_data,
          box: action.payload,
        },
      };
    case actionTypes.REMOVE_TASK_RECOVERED_EQUIPMENT:
      let filteredRecoveredEquipment =
        state.equipment_recovered.filter(
          (el) => el !== action.payload
        );
      return {
        ...state,
        equipment_recovered: filteredRecoveredEquipment,
      };
    case actionTypes.SET_TASK_RECOVERED_EQUIPMENT:
      let currentRecoveredEquipment =
        state.equipment_recovered;
      currentRecoveredEquipment.push(action.payload);
      return {
        ...state,
        equipment_recovered: currentRecoveredEquipment,
      };
    case actionTypes.SET_TASK_MATERIAL_EQUIPMENT:
      return {
        ...state,
        materials: [...state.materials, action.payload],
      };
    case actionTypes.SET_TASK_UPDATED_EQUIPMENT:
      let currentUpdatedEquipments =
        state.equipment_updated;
      let index = state.equipment_updated.findIndex(
        (el) =>
          el.id_sub_cta_equipment ===
          action.payload.id_sub_cta_equipment
      );
      if (index >= 0) {
        currentUpdatedEquipments[index] = action.payload;
      } else {
        currentUpdatedEquipments.push(action.payload);
      }
      return {
        ...state,
        equipment_updated: currentUpdatedEquipments,
      };
    case actionTypes.SET_TASK_PORT:
      return {
        ...state,
        dslam: { ...state.dslam, id_port: action.payload },
      };
    case actionTypes.SET_TASK_DSLAM:
      return {
        ...state,
        dslam: { ...state.dslam, id_dslam: action.payload },
      };
    case actionTypes.SET_TASK_NODE:
      return {
        ...state,
        id_node: action.payload,
      };
    case actionTypes.SET_TASK_OLT:
      let newOlt = { id_olt: action.payload };
      return {
        ...state,
        fo: newOlt,
      };
    case actionTypes.RESET_FORM_STEP:
      return initialState;

    case actionTypes.SET_FORM_STEP:
      let newStep;
      if (action.payload === "next") {
        newStep = state.step + 1;
      } else {
        newStep = state.step - 1;
      }
      return {
        ...state,
        step: newStep,
      };
    case actionTypes.SET_TASK_TECHNICAL_DATA:
      let newTechnicalData = state.technicalData;
      newTechnicalData[action.payload.target.name] =
        action.payload.target.value;
      return {
        ...state,
        technicalData: newTechnicalData,
      };
    case actionTypes.SET_TASK_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case actionTypes.SET_TASK_MATERIALS:
      return {
        ...state,
        materials: [...state.materials, action.payload],
      };
    case actionTypes.UPDATE_TASK_MATERIALS:
      let newMaterials = state.materials.filter(
        (item) => item !== action.payload
      );
      return {
        ...state,
        materials: newMaterials,
      };
    case actionTypes.GET_TASK_MATERIALS:
      return {
        ...state,
        availableMaterials: action.payload,
      };

    case actionTypes.SET_SIGNATURE:
      return {
        ...state,
        signature: action.payload,
      };

      case actionTypes.SET_TASK_TIME_WORKED:
        return {
          ...state,
          time_start: action.payload.start,
          time_finish: action.payload.finish
        };

    default:
      return state;
  }
};

export default closeTaskReducer;
