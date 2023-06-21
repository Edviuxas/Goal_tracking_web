import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Login from './Login.js';
import Register from './Register.js';
import Goals from './Goals.js';
import GoalCreation from './GoalCreation.js';
import jwt_decode from "jwt-decode";
import { getUser, getUserByEmail, refreshToken } from '../services/api.js';
import { CircularProgress, Box } from '@mui/material';
import { ConstructionOutlined } from '@mui/icons-material';

function App() {
  const navigate = useNavigate();  
  const [authenticatedUser, setAuthenticatedUser] = useState({});

  useEffect(() => {
    const currentDate = new Date();
    const jwtToken = localStorage.getItem('JWT');
    const decodedToken = jwt_decode(jwtToken);
    console.log('decoded token');
    console.log(decodedToken);
    console.log('decoded token sub: ' + decodedToken.sub);
    getUserByEmail(decodedToken.sub)
      .then(user => {
        // console.log(user);
        if (decodedToken.exp * 1000 < currentDate.getTime()) { // if the token is expired
          console.log('refreshing token from App.js');
          refreshToken(user).then(res => {
            if (res.status !== 200) {
              setAuthenticatedUser(null);
              return;
            } else {
              const authUser = {
                id: user.id,
                email: user.email,
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken
              };
              setAuthenticatedUser(authUser);
              localStorage.setItem('JWT', res.data.accessToken);
              sessionStorage.setItem('user', JSON.stringify(authUser));
            }
          });
        } else {
          const authUser = {
            id: user.id,
            email: user.email,
            accessToken: jwtToken,
            refreshToken: user.refreshToken
          };
          setAuthenticatedUser(authUser);
          sessionStorage.setItem('user', JSON.stringify(authUser));
        }
      })
      .catch(e => console.log(e)) 
  }, []);

  useEffect(() => {
    if(authenticatedUser === null) {
      navigate('/login');
    } else if (Object.keys(authenticatedUser).length !== 0) {
      navigate('/goals');
    }
  }, [authenticatedUser])

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}

export default App;
