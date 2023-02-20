 import { AllActions } from "./Interfaces";

export function UserReducer(state: any, action: AllActions) {
  
  switch (action.type) {
    case "LOAD_DATA":
      return {
        ...state,
        datos: action.payload,
      };
    case "LOAD_USER_CHECK":
      return {
        ...state,
        oneUser: action.payload,
      };

    default:
      return state;
  }
};
