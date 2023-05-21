import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Login from './components/Login';
import Goals from './components/Goals';
import Register from './components/Register';
import GoalCreation from './components/GoalCreation';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register />} />
        <Route path='/goals' element={<Goals/>} />
        <Route path='/createGoal' element={<GoalCreation/>}/>
      </Routes>
    </BrowserRouter>
);