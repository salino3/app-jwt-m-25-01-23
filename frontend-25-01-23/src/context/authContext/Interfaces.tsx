
export type AllActions = UPDATE_Action_TRUE
  | UPDATE_Action_FALSE;


 interface UPDATE_Action_TRUE {
   type: "UPDATE_USER_CHECK_TRUE";
   payload: any;
 };


  interface UPDATE_Action_FALSE {
    type: "UPDATE_USER_CHECK_FALSE";
    payload: any;
  };

// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   active: boolean;
//   isAdmin: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   token: string;
// }