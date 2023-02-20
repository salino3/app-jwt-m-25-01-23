import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext/AuthProvider";
import { UserProvider } from "./context/userContext/UserProvider";
import { ProductProvider } from "./context/productContext/ProductProvider";
import { OrderProvider } from "./context/orderContext/OrderProvider";
// npm i jsonwebtoken
// npm install jwt-decode //<- for Typescript
// npm i @types/jwt-decode //<- for Typescript
// npm install bcrypt
// npm i --save-dev @types/bcrypt
// npm install url

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <OrderProvider>
       <UserProvider>
        <ProductProvider>
         <BrowserRouter>
          <App />
         </BrowserRouter>
        </ProductProvider>
       </UserProvider>
      </OrderProvider>
    </AuthProvider>
  </React.StrictMode>
);
