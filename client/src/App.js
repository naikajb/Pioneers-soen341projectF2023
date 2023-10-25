import React from 'react';
import CardGrid from './Components/CardGrid';
import './Components/Navbar.css';
import Navbar from './Components/Navbar.js';
import './App.css';
import EditProperty from './Components/EditPropertyGrid.js';
import './Components/EditProperty.css';

function App() {
  return (
    <div class = "page">
      <Navbar/ >
      <EditProperty/ >
    </div>
  )
}

export default App;



