import React from 'react';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './protectedRoutes';
import PublicRoutes from './publicRoutes';

import Home from '../views/homePage/Home';
import Signup from '../views/signupPage/Signup';
import Login from '../views/loginPage/Login';
import Dashboard from '../views/dashboardPage/Dashboard';
import Note from '../views/notepage/note';


const routes = () => (
    <Router>
        <Routes>
            <Route path="/" element={<PublicRoutes/>} >
                <Route path="/" element={<Home />}/>
                <Route path="/signup" element={<Signup />}/>
                <Route path="/login" element={<Login />}/>
            </Route>
            <Route path="/" element={<ProtectedRoutes/>} >
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/dashboard/:id" element={<Note />}/>
            </Route>
        </Routes>
    </Router>
)

export default routes