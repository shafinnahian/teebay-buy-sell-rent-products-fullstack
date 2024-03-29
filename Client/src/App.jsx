import React from 'react'
import {Route, Routes} from 'react-router-dom'
import ShowList from './pages/ShowList'

const App = () => {
  return (
    <Routes>
      <Route path='/product/list' element= {ShowList} />
      {/* <Route path='' element= {} />
      <Route path='' element= {} />
      <Route path='' element= {} />
      <Route path='' element= {} /> */}
    </Routes>
  )
}

export default App
