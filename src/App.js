import React, { useState, useEffect } from 'react';
import Home from './pages/website/home'
import About from './pages/website/about'
import Swap from './pages/account/swap'
import { BrowserRouter, Routes, Route, Link  } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
     <Routes>
       <Route path="/"  element={<Home/>} />
       <Route path="/about" element={<About/>} />
       <Route path="/swap" element={<Swap/>}/>
  
     </Routes>
     
    </BrowserRouter>

  );
}

export default App;
