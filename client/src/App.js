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
import NavbarBuyer from './Components/NavbarBuyer.js';
import SearchBroker from './Components/SearchBroker.js';
import './Components/styles/SearchBroker.css';
import Footer from './Components/footer.js';
import BrokersList from './Components/Broker';
import BrokerOffers from './Components/BrokerOffers'

function App() {

  return (
    <Router>
      <Routes>
        <Route className = 'navbar-element' exact path='/' element={<div><NavbarBuyer /> <CardGrid /><Footer/></div>} />
        <Route path="/CardDetail" element={<div><Navbar /> <ListingDetails /><Footer/></div>} />
        <Route exact path='/editProp' element={<div><NavbarBroker /> <EditPropertyView /><Footer/></div>} />
        <Route exact path='/login' element={<div><Navbar /> <Login /><Footer/></div>} />
        <Route exact path='/register' element={<div><Navbar /><Register /><Footer/></div>} />
        <Route exact path = '/manageOffers' element = {<div><NavbarBroker /> <ManageOffers /><Footer/></div>} />
        <Route exact path = '/searchBrokers' element = {<div><NavbarBuyer/><SearchBroker/><Footer/></div>}/>
        <Route exact path='/broker' element={
          <div style={{flex: '1 0 auto'}}><Navbar /><BrokersList /> <Footer /></div>} />
  
      </Routes>
    </Router>

  )
}

export default App;




