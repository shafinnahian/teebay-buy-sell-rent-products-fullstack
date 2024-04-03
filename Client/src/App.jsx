import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserReg from './views/auth/UserReg'
import UserLogin from './views/auth/UserLogin';
import Dashboard from './views/dashboard/Dashboard';
import OwnProductList from './views/OwnProductList/OwnProductList';
import EditProduct from './views/OwnProductList/EditProduct';
import AllProducts from './views/OwnProductList/AllProducts';
import ProductType from './views/OwnProductList/ProductType';
import LogoutButton from './Logout';

const App = () => {
  const loggedIn = window.localStorage.getItem("jwtToken");
  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<OwnProductList />} />
        ) : (
          <Route path="/" element={<UserLogin />} />
        )}
        {loggedIn && (
          <>
            <Route path="/add-product" element={<Dashboard />} />
            <Route path="/my-product" element={<OwnProductList />} />
            <Route path="/edit-product/:ProductId" element={<EditProduct />} />
            <Route path="/all-product" element={<AllProducts />} />
            <Route path="/products-type" element={<ProductType />} />
          </>
        )}
        <Route path="/user/register" element={<UserReg />} />
      </Routes>
      {loggedIn ? <LogoutButton /> : <></>}
    </BrowserRouter>
  );
};

export default App
