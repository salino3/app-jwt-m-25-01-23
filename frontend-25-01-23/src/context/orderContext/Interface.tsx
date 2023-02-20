export type AllActions = UPDATE_Action_TRUE | UPDATE_Action_FALSE;

interface UPDATE_Action_TRUE {
  type: "UPDATE_ORDERS_CHECK_TRUE";
  payload: any;
}


interface UPDATE_Action_FALSE {
  type: "UPDATE_ORDERS_CHECK_FALSE";
  payload: any;
}
