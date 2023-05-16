import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from './Login.js';
import Register from './Register.js';
import Goals from './Goals.js';
import GoalCreation from './GoalCreation.js';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/goals' element={<Goals/>} />
        <Route path='/createGoal' element={<GoalCreation/>}/>
      </Routes>
    </>
  );
}

export default App;
