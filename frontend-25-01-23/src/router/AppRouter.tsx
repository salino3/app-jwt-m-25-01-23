import {Routes, Route, } from 'react-router-dom';
import AdminUserForm from "../pages/adminPages/AdminUserForm";
import {
  Home,
  PageNotFound,
  RegisterPage,
  Private,
  LoginPage,
  UpdateUser,
  DeleteUser,
  AdminPage,
  UsersList,
  ProductsList,
  MyOrders,
} from "../pages";
import { PublicRoutes, PrivateRoutes, AdminRoutes } from "./router-paths";
import { ProductUpdateForm } from '../pages/adminPages/ProductUpdateForm';
import { BuyProducts } from '../pages/BuyProducts';

const AppRouter = () => {


  return (
    <>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
        {/* Privates Routes */}

        <Route path="/private" element={<PrivateRoutes />}>
          <Route path="/private" element={<Private />} />
          <Route path="/private/update" element={<UpdateUser />} />
          <Route path="/private/delete" element={<DeleteUser />} />
          <Route path="/private/buy" element={<BuyProducts />} />
          <Route path="/private/myorders" element={<MyOrders />} />
          <Route path="/private/*" element={<PageNotFound />} />
        </Route>
        {/* Admin Routes */}
        <Route path="/admin_page" element={<AdminRoutes />}>
          <Route path="/admin_page" element={<AdminPage />} />
          <Route path="/admin_page/users_list" element={<UsersList />} />
          <Route path="/admin_page/products_list" element={<ProductsList />} />
          <Route
            path="/admin_page/users_form/:_id"
            element={<AdminUserForm />}
          />
          <Route
            path="/admin_page/update_p_form/:_id"
            element={<ProductUpdateForm />}
          />
          <Route path="/admin_page/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRouter