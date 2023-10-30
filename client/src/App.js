import React from 'react';
import './Components/Navbar.css';
import Navbar from './Components/Navbar.js';
import CardGrid from "./Components/CardGrid";
//import CardDetail from "./Components/CardDetail";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Components/EditProperty.css';
import EditPropertyView from './Components/EditPropertyView.js';
//import { useLocation } from "react-router-dom";
import ListingDetails from './Components/listing';
import dummyListings from './Components/dummyData';
import './Components/listingDet.css';
import EditCard from "./Components/EditCard";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<div><Navbar /> <CardGrid /></div> } />
        <Route path="/CardDetail" element={<div><Navbar /> <ListingDetails /></div>} />
        <Route exact path='/editProp' element={<div><Navbar /> <EditPropertyView /></div> } />
        </Routes>
    </Router>
    
  )
}

export default App;




