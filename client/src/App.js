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
//Amans below
import Footer from './Components/footer'; 
import BrokersList from './Components/Broker';
import BrokerOffers from './Components/BrokerOffers'

//Amans above



function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<div><Navbar /> <CardGrid /><Footer /></div>} />
        <Route path="/CardDetail" element={<div><Navbar /> <ListingDetails /><Footer /></div>} />
        <Route exact path='/editProp' element={<div><Navbar /> <EditPropertyView /><BrokerOffers /><Footer /></div>} />
        <Route exact path='/login' element={<div><Navbar /> <Login /></div>} />
        <Route exact path='/register' element={<div><Navbar /><Register /></div>} />
        <Route exact path='/broker' element={
        <div style={{flex: '1 0 auto'}}><Navbar /><BrokersList /> <Footer /></div>} />
      </Routes>
    </Router>

  )
}

export default App;




