import { AllActions } from "./Interfaces";

export const ProductReducer = (state: any, action: AllActions) => {
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        datos: action.payload,
      };
    case "LOAD_PRODUCT_CHECK":
      return {
        ...state,
        oneUser: action.payload,
      };

    default:
      return state;
  }
};
