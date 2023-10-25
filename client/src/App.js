import React from 'react';
import './Components/Navbar.css';
import Navbar from './Components/Navbar.js';
import CardGrid from "./Components/CardGrid";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Navbar />} />
        <Route path = '/grid' element={<CardGrid />} />
        </Routes>
    </Router>
    
  )
}

export default App;



