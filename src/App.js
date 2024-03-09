import React, { useEffect } from 'react';
import "./App.css"
import {BroswerRouter, Routes,Route, BrowserRouter} from 'react-router-dom';
import {LoginPage,SignUpPage,ActivationPage, HomePage,ProductsPage,BestSellingPage,EventsPage,FAQPage,ProductDetailsPage} from './Routes.js';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import { server } from './server.js';
import axios from 'axios';
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from 'react-redux';

const App = () => {
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      Store.dispatch(loadUser());
    } catch (error) {
      console.error('Error in App component:', error);
    }
  }, []);


  return (
<>
{
  loading  ? (
    null
  ) : (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
      <Route path="/products" element={<ProductsPage/>}/>
      <Route path="/products/:name" element={<ProductDetailsPage/>}/>
      <Route path="/best-selling" element={<BestSellingPage/>}/>
      <Route path="/events" element={<EventsPage/>}/>
      <Route path="/faq" element={<FAQPage/>}/>
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
</>
  )

  
}

export default App