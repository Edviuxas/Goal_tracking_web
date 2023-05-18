import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Login from './components/Login';
import Goals from './components/Goals';
import Register from './components/Register';
import GoalCreation from './components/GoalCreation';
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { getUser, refreshToken } from './services/api';

let authenticatedUser = null;
const currentDate = new Date();
const jwtToken = localStorage.getItem('JWT');
const decodedToken = jwt_decode(jwtToken);
getUser(decodedToken.id)
  .then(user => {
    console.log(user);
    if (decodedToken.exp * 1000 < currentDate.getTime()) { // if the token is expired
      // console.log('lalala from index.js');
      // refreshToken({refreshToken: 'asss', id: 'ak111'});
      console.log('refreshing token');
      refreshToken(user).then(res => {
        authenticatedUser =  {
          ...user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken
        }
        localStorage.setItem('JWT', authenticatedUser.accessToken);
      });
    } else {
      console.log('no need to refresh token');
      authenticatedUser = user;
    }
    // console.log(user);
  })
  .catch(e => console.log(e)) 

// console.log('from index.js');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            authenticatedUser ? (
              <Navigate to='/goals'/>
            ) : (
              <Navigate to='/login'/>
            )
          }
        />
        {/* <Route path='/'>
          {authenticatedUser ? <Navigate to='/goals'/> : <Navigate to='login'/>}
        </Route> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/goals' element={<Goals/>} />
        <Route path='/createGoal' element={<GoalCreation/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);