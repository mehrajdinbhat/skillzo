import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Courses from './components/Courses';
import Buy from './components/Buy';
import Purchases from './components/Purchases';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* other routes */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy/>} />
        <Route path="/Purchases" element={<Purchases/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App