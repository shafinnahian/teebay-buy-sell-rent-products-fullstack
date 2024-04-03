import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserReg from './views/auth/UserReg'
import UserLogin from './views/auth/UserLogin';
import Dashboard from './views/dashboard/Dashboard';
import OwnProductList from './views/OwnProductList/OwnProductList';
import Category from './views/dashboard/Category';
import EditProduct from './views/OwnProductList/EditProduct';
import AllProducts from './views/OwnProductList/AllProducts';
import BorrowedList from './views/OwnProductList/BorrowedList';
import LentList from './views/OwnProductList/LentList';
import BoughtList from './views/OwnProductList/BoughtList';
import SoldList from './views/OwnProductList/SoldList';

const App = () => {
  return (
    <BrowserRouter>    
    <Routes>
      <Route path='/user/register' element= {<UserReg/>}/>
      <Route path='/' element= {<UserLogin/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
      <Route path='/ownList' element={<OwnProductList/>}/>
      <Route path='/category' element={<Category/>}/>
      <Route path='/edit-product/:ProductId' element={<EditProduct/>}/>
      <Route path='/all-product' element={<AllProducts/>}/>
      <Route path='/borrowed-list' element={<BorrowedList/>} />
      <Route path='/lent-list' element={<LentList/>}/>
      <Route path='/bought-list' element={<BoughtList/>}/>
      <Route path='/sold-list' element={<SoldList/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
