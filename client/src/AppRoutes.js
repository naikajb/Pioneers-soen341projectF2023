import React, { useContext } from 'react';
import './Components/styles/Navbar.css';
import Navbar from './Components/Navbar.js';
import CardGrid from "./Components/CardGrid";
//import CardDetail from "./Components/CardDetail";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
// import NavbarBroker from './Components/NavbarBroker.js';
import ManageOffers from './Components/ManageOffers.js';
import './Components/styles/ManageOffers.css';
// import NavbarBuyer from './Components/NavbarBuyer.js';
import SearchBroker from './Components/SearchBroker.js';
import './Components/styles/SearchBroker.css';
import Footer from './Components/footer'; 
import { UserContext } from './context/userContext.js';
import BrokersList from './Components/Broker';
import BrokerOffers from './Components/BrokerOffers'
import axios from 'axios'


function AppRoutes() {

  const { user } = useContext(UserContext);

  
  return (
    <Routes>
      {/* Common Public Routes for all userTypes */}
      <Route path="/login" element={<div><Navbar /><Login /><Footer /></div>} />
      <Route path="/register" element={<div><Navbar /><Register /><Footer /></div>} />
      <Route path="/" element={<div><Navbar /><CardGrid /><Footer /></div>} />
      <Route path="/listing" element={<div><Navbar /><ListingDetails /><Footer /></div>} />

      {/* Public Buyer Routes */}
      <Route path="/searchBrokers" element={<div><Navbar /><SearchBroker /><Footer /></div>} />
      

      { /* Private Broker Routes */}
      <Route path="/manageOffers" element={<div><Navbar /><ManageOffers /><Footer /></div>} />
      <Route path="/editProp" element={<div><Navbar /><EditPropertyView /><Footer /></div>} />


      { /* Private Admin Routes */}
      <Route path="/broker" element={<div><Navbar /><BrokersList /><Footer /></div>} />

  
    </Routes>
  );
}

export default AppRoutes;
