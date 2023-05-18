import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from './Login.js';
import Register from './Register.js';
import Goals from './Goals.js';
import GoalCreation from './GoalCreation.js';
import jwt_decode from "jwt-decode";
import { getUser, refreshToken } from '../services/api.js';

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const currentDate = new Date();
  //   const jwtToken = localStorage.getItem('JWT');
  //   const decodedToken = jwt_decode(jwtToken);
  //   console.log(decodedToken);
  //   getUser(decodedToken.id)
  //     .then(user => {
  //       if (decodedToken.exp * 1000 < currentDate.getTime()) { // if the token is expired
  //         console.log('lalala');
  //       } else {
  //         navigate('/goals', { state: user });
  //       }
  //       // console.log(user);
  //     })
  //     .catch(e => console.log(e)) 
  // }, []);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/goals' element={<Goals/>} />
        <Route path='/createGoal' element={<GoalCreation/>}/>
      </Routes>
    </>
  );
}

export default App;
