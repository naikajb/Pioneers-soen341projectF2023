import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

function ListingDetails() {
  const location = useLocation();
  const { id } = location.state || {};
  const [listing, setListing] = useState(null);

  //fetch property details to be displayed for property that was clicked (id)
  const fetchProperty = async () => {
    try {
      const response = await axios.get("/api/properties");
      console.log("Fetched data:", response.data);

      const property = response.data.find((property) => property._id === id);
      if (property) {
        console.log("Found property bathroom:", property.bathroom);
        setListing(property);
      } else {
        console.log("Property not found with id:", id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);


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
          {listing ? (
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
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="right-column">
          <div>
            <h2 className="section-title">Broker Details</h2>
            <p className="detail">Name: {listing?.broker?.name}</p>
            <p className="detail">Contact: {listing?.broker?.contact}</p>
            {/* Add more broker details as needed */}
          </div>
          <button className="cta-button" onClick={openPopup}>
            Book an Appointment
          </button>
          {/* ... Broker details ... */}
        </div>
      </div>
      {/* ... Popup form code ... */}
    </div>
  );
}

export default ListingDetails;
