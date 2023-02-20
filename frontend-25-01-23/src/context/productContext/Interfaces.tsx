export type AllActions = LoadDataAction | Load_PRODUCT_CHECK;


   interface LoadDataAction {
     type: "LOAD_DATA";
     payload: any;
   }

interface Load_PRODUCT_CHECK {
  type: "LOAD_PRODUCT_CHECK";
  payload: any;
}