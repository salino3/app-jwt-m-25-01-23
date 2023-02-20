import { AllActions } from "./Interfaces";


export function AuthReducer(state: any, action: AllActions) {
  switch (action.type) {
    case "UPDATE_USER_CHECK_TRUE":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "UPDATE_USER_CHECK_FALSE":
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};
