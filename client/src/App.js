import React from 'react';
import CardGrid from './Components/CardGrid';
import './Components/Navbar.css';
import Navbar from './Components/Navbar.js';
import './App.css';
import './Components/EditProperty.css';
import EditPropertyView from './Components/EditPropertyView.js';

function App() {
  return (
    <div class = "page">
      <Navbar/ >
      <div class = "page-content">
        <EditPropertyView />
    </div>
    </div>
  )
}

export default App;



