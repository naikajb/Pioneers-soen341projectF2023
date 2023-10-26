import React from 'react';
import './Components/Navbar.css';
import Navbar from './Components/Navbar.js';
import CardGrid from "./Components/CardGrid";
import CardDetail from "./Components/CardDetail";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Components/EditProperty.css';
import EditPropertyView from './Components/EditPropertyView.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<div><Navbar /> <CardGrid /></div> } />
        <Route path = '/grid' element={<CardGrid />} />
        <Route path="/CardDetail" element={<CardDetail />} />
        
        </Routes>
    </Router>
    
  )
}

export default App;




