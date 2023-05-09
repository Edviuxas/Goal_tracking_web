import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Box, CssBaseline } from '@mui/material';
import Register from './Register';
import { loginUser } from '../services/api';

function Login() {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // console.log({
      //     email: data.get('email'),
      //     password: data.get('password'),
      // });
      const user = await loginUser({
        email: data.get('email'),
        password: data.get('password'),
      });
      console.log(user);
      if (!user.error) {
        // setUserInfo(user);
        // console.log(userInfo);
        navigate('/goals', { state: user });
      }
  };

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link to="/register">
              <Button
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                Register
              </Button>
            </Link>
            
        </Box>
        
    </Container>
  )
}

export default Login;