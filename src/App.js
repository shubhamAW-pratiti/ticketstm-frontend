import * as React from 'react';
import { useState } from 'react';
import { Routes , Route } from 'react-router-dom';
import {Container , Stack, Typography} from '@mui/material'


import Header from './Components/Header';
import Footer from './Components/Footer';
import Login_poc from './Components/Login_poc';
import SignUp from './Components/SignUp';
import ForgotPass from './Components/ForgotPass';

export default function App() {
const[token , setToken]=useState();


  return (
    <div>
       <Header/>
      <Routes>   
        <Route path="/" element={<Login_poc/>}/>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/ForgotPass" element={<ForgotPass/>}/>
      </Routes>
      <Footer/>
    </div>
    
 );
}