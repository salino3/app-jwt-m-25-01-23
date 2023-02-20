export type AllActions =
  | LoadDataAction
  | Load_USER_CHECK


   interface LoadDataAction {
     type: "LOAD_DATA";
     payload: any;
   }

   interface Load_USER_CHECK {
     type: "LOAD_USER_CHECK";
     payload: any;
   }

   export type T = number | string;
