import React, { useEffect } from 'react';
import "./App.css"
import {BroswerRouter, Routes,Route, BrowserRouter} from 'react-router-dom';
import {LoginPage,SignUpPage,ActivationPage, HomePage} from './Routes.js';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { server } from './server.js';
import axios from 'axios';
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);


  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
    </Routes>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition= {Bounce}
/>
    </BrowserRouter>
  )
}

export default App