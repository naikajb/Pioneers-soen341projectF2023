import React from 'react';
import './Components/styles/Navbar.css';
import Navbar from './Components/Navbar.js';
import CardGrid from "./Components/CardGrid";
//import CardDetail from "./Components/CardDetail";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Components/styles/App.css';
import './Components/styles/EditProperty.css';
import EditPropertyView from './Components/EditPropertyView.js';
//import { useLocation } from "react-router-dom";
import ListingDetails from './Components/listing';
//import dummyListings from './Components/dummyData';
import './Components/styles/listingDet.css';
//import EditCard from "./Components/EditCard";
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import NavbarBroker from './Components/NavbarBroker.js';
import ManageOffers from './Components/ManageOffers.js';
import './Components/styles/ManageOffers.css';


function App() {

  return (
    <Router>
      <Routes>
        <Route className = 'navbar-element' exact path='/' element={<div><Navbar /> <CardGrid /></div>} />
        <Route path="/CardDetail" element={<div><Navbar /> <ListingDetails /></div>} />
        <Route exact path='/editProp' element={<div><NavbarBroker /> <EditPropertyView /></div>} />
        <Route exact path='/login' element={<div><Navbar /> <Login /></div>} />
        <Route exact path='/register' element={<div><Navbar /><Register /></div>} />
        <Route exact path = '/manageOffers' element = {<div><NavbarBroker /> <ManageOffers /></div>} />
      </Routes>
    </Router>

  )
}

export default App;




