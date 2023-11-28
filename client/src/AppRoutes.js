// import React, { useContext } from 'react';
// import './Components/styles/Navbar.css';
// import Navbar from './Components/Navbar.js';
// import CardGrid from "./Components/CardGrid";
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './Components/styles/App.css';
// import './Components/styles/EditProperty.css';
// import EditPropertyView from './Components/EditPropertyView.js';
// import ListingDetails from './Components/listing';
// import './Components/styles/listingDet.css';
// import Login from './Components/Login.js';
// import Register from './Components/Register.js';
// import ManageOffers from './Components/ManageOffers.js';
// import './Components/styles/ManageOffers.css';
// import SearchBroker from './Components/SearchBroker.js';
// import './Components/styles/SearchBroker.css';
// import Footer from './Components/footer';
// import { UserContext } from './context/userContext.js';
// import BrokersList from './Components/Broker';
// import BrokerOffers from './Components/BrokerOffers'
// import axios from 'axios'

// function AppRoutes() {

//   const { user } = useContext(UserContext);

//   return (
//     <Routes>
//       {/* Common Public Routes for all userTypes */}
//       <Route path="/login" element={<div><Navbar /><Login /><Footer /></div>} />
//       <Route path="/register" element={<div><Navbar /><Register /><Footer /></div>} />
//       <Route path="/" element={<div><Navbar /><CardGrid /><Footer /></div>} />
//       <Route path="/listing" element={<div><Navbar /><ListingDetails /><Footer /></div>} />

//       {/* Public Buyer Routes */}
//       <Route path="/searchBrokers" element={<div><Navbar /><SearchBroker /><Footer /></div>} />

//       { /* Private Broker Routes */}
//       <Route path="/manageOffers" element={<div><Navbar /><ManageOffers /><Footer /></div>} />
//       <Route path="/editProp" element={<div><Navbar /><EditPropertyView /><Footer /></div>} />

//       { /* Private Admin Routes */}
//       <Route path="/broker" element={<div><Navbar /><BrokersList /><Footer /></div>} />

//     </Routes>
//   );
// }

// export default AppRoutes;

import React, { useContext } from 'react'
import './Components/styles/Navbar.css'
import Navbar from './Components/Navbar.js'
import CardGrid from './Components/CardGrid'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom' // eslint-disable-line

import './Components/styles/App.css'
import './Components/styles/EditProperty.css'
import EditPropertyView from './Components/EditPropertyView.js'
import ListingDetails from './Components/listing'
import './Components/styles/listingDet.css'
import Login from './Components/Login.js'
import Register from './Components/Register.js'
import ManageOffers from './Components/ManageOffers.js'
import './Components/styles/ManageOffers.css'
import SearchBroker from './Components/SearchBroker.js'
import './Components/styles/SearchBroker.css'
import Footer from './Components/footer'
import { UserContext } from './context/userContext.js'
import BrokersList from './Components/Broker'

function AppRoutes () { //eslint-disable-line
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const redirectToLogin = () => { // eslint-disable-line
    navigate('/login')
    return null
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Common Public Routes for all userTypes */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<CardGrid />} />
        <Route path='/listing' element={<ListingDetails />} />

        {/* Public Buyer Routes */}
        <Route path='/searchBrokers' element={<SearchBroker />} />

        {/* Private Broker Routes */}
        {user && user.type === 'broker'
          ? (
            <Route path='/manageOffers' element={<ManageOffers />} />
            )
          : (
            <Route path='/manageOffers' element={<Login />} />
            )}

        {user && user.type === 'broker'
          ? (
            <Route path='/editProp' element={<EditPropertyView />} />
            )
          : (
            <Route path='/editProp' element={<Login />} />
            )}

        {/* Private Admin Routes */}
        {user && user.type === 'admin'
          ? (
            <Route path='/broker' element={<BrokersList />} />
            )
          : (
            <Route path='/broker' element={<Login />} />
            )}
      </Routes>
      <Footer />
    </>
  )
};

export default AppRoutes
