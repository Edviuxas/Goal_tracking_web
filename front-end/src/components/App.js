import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './Login.js';
import Register from './Register.js';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
