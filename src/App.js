import React from 'react';
import "./App.css"
import {BroswerRouter, Routes,Route, BrowserRouter} from 'react-router-dom';
import {LoginPage,SignUpPage} from './Routes.js';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App