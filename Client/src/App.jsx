import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserReg from './views/auth/UserReg'
import UserLogin from './views/auth/UserLogin';
import Dashboard from './views/dashboard/Dashboard';
import OwnProductList from './views/OwnProductList/OwnProductList';
import EditProduct from './views/OwnProductList/EditProduct';
import AllProducts from './views/OwnProductList/AllProducts';
import ProductType from './views/OwnProductList/ProductType';

const App = () => {
  return (
    <BrowserRouter>    
    <Routes>
      <Route path='/user/register' element= {<UserReg/>}/>
      <Route path='/' element= {<UserLogin/>}/>
      <Route path='/add-product' element = {<Dashboard/>}/>
      <Route path='/my-product' element={<OwnProductList/>}/>
      <Route path='/edit-product/:ProductId' element={<EditProduct/>}/>
      <Route path='/all-product' element={<AllProducts/>}/>
      <Route path='/products-type' element={<ProductType/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
