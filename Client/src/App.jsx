import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserReg from './views/auth/UserReg'
import UserLogin from './views/auth/UserLogin';
import Dashboard from './views/dashboard/Dashboard';
import OwnProductList from './views/OwnProductList/OwnProductList';
import Category from './views/dashboard/Category';

const App = () => {
  return (
    <BrowserRouter>    
    <Routes>
      <Route path='/user/register' element= {<UserReg/>}/>
      <Route path='/' element= {<UserLogin/>}/>
      <Route path='/dashboard' element = {<Dashboard/>}/>
      <Route path='/ownList' element={<OwnProductList/>}/>
      <Route path='/category' element={<Category/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
