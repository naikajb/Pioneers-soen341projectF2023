import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import dummyListings from './dummyData';

function ListingDetails() {

  const location = useLocation();
  const { id } = location.state || {};

  const listing = dummyListings[id-1];

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    appointmentDate: '',
    time: '',
  });

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can handle form submission here or make an API request to submit the data
    console.log('Form data submitted:', formData);
    closePopup(); // Close the popup after submission
  };

  return (
    <div className="main-content">
      <div className="flex-container">
        <div className="left-column">
          <div>
            <h2 className="section-title">Property Details</h2>
            <p className="detail">Description: {listing.description}</p>
            <p className="detail">Price: ${listing.price}</p>
            <p className="detail">Bedrooms: {listing.bedroom}</p>
            <p className="detail">Bathrooms: {listing.bathroom}</p>
            {/* Add more listing details as needed */}
            
            <h2 className="section-title">Amenities</h2>
            <ul className="amenities-list">
              {listing.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
          {/* ... Your listing details content ... */}
         
        </div>

        <div className="right-column">
        <div>
            <h2 className="section-title">Broker Details</h2>
            <p className="detail">Name: {listing.broker.name}</p>
            <p className="detail">Contact: {listing.broker.contact}</p>
            {/* Add more broker details as needed */}
          </div>
        <button className="cta-button" onClick={openPopup}>
            Book an Appointment
          </button>
          {/* ... Broker details ... */}
        </div>
      </div>

      {isPopupOpen && (
        <div id="popup" className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>
              &times;
            </span>
            <h2 className="section-title">Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstname">First Name:</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleFormChange}
                />
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleFormChange}
                />
              </div>
              {/* Add more form fields... */}
              <div className="form-group">
                <button className="cta-button" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListingDetails;
