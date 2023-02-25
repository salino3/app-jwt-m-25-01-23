import { AllActions } from './Interface';

export const OrderReducer = (state: any, action: AllActions) => {
  
    switch (action.type) {
      case "UPDATE_ORDERS_CHECK_TRUE":
        return {
          ...state,
          datos: action.payload,
        };
      case "UPDATE_ORDERS_CHECK_FALSE":
        return {
          ...state,
          oneOrder: action.payload,
        };
      default:
        return state;
    };
};
