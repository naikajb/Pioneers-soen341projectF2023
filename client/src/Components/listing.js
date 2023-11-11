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
  const [isPopupOpen2, setPopupOpen2] = useState(false);
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
  const openPopup2 = () => {
    setPopupOpen2(true);
  };

  const closePopup2 = () => {
    setPopupOpen2(false);
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
              <p className="detail">Price: {listing.price}</p>
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
          <button className="cta-button" button data-testid = "BookAppointment" onClick={openPopup}>
            
            Book an Appointment
          </button>
              {isPopupOpen && (
            <div id="popup" className="popup">
              <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h2 className="section-title">Book an Appointment</h2>
                <form>
                  {/* Add your form fields here */}
                  <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" id="firstname" name="firstname" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" id="lastname" name="lastname" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentDate">Select a date:</label>
                    <input type="date" id="appointmentDate" name="appointmentDate" required />
                  </div>

                  <div className="form-group">
                    <label>Select your preferred time:</label><br />
                    <label htmlFor="morning">
                      <input type="radio" id="morning" name="time" value="morning" /> Morning
                    </label><br />
                    <label htmlFor="afternoon">
                      <input type="radio" id="afternoon" name="time" value="afternoon" /> Afternoon
                    </label><br />
                    <label htmlFor="evening">
                      <input type="radio" id="evening" name="time" value="evening" /> Evening
                    </label>
                  </div>

                  <div className="form-group">
                    <button className="cta-button" type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          )}
  
          <button className="cta-button" button data-testid = "MakeOffer" onClick={openPopup2}>
            
            Make an Offer
          </button>
              {isPopupOpen2 && (
            <div id="popup" className="popup">
              <div className="popup-content">
                <span className="close" onClick={closePopup2}>&times;</span>
                <h2 className="section-title">Make an Offer</h2>
                <form>
                  {/* Add your form fields here */}
                  <div className="form-group">
                    <label htmlFor="firstname">First Name:</label>
                    <input type="text" id="firstname" name="firstname" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastname">Last Name:</label>
                    <input type="text" id="lastname" name="lastname" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="offer">Offer:</label>
                    <input type="text" id="offer" name="offer" required />
                  </div>
                  

                  <div className="form-group">
                    <button className="cta-button" type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* ... Broker details ... */}
        </div>
      </div>
      {/* ... Popup form code ... */}
    </div>
  );
}

export default ListingDetails;
