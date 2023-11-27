import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/EditPropertyView.css'; // Make sure to create the corresponding CSS file

const PropertyCard = ({ property, onEdit }) => (
  <div className="property-card">
    <img src={property.image} alt="Property" className="property-image" />
    <div className="property-info">
      <h2 className="property-price">{property.price}</h2>
      <p className="property-address">{property.address}</p>
      <p className="property-details">{property.bedroom} Bedrooms</p>
      <p className="property-details">{property.bathroom} Bathrooms</p>
      <p className="property-description">{property.description}</p>
      <div className="property-amenities">
        {property.amenities.map((amenity, index) => (
          <span key={index} className="amenity">{amenity}</span>
        ))}
      </div>
      <button className="edit-button" onClick={() => onEdit(property)}>EDIT THIS PROPERTY</button>
    </div>
  </div>
);

const EditPropertyView = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  const handleEdit = (property) => {
    // Placeholder for edit functionality
    console.log('Editing property:', property);
  };

  return (
    <div className="properties-container">
      {properties.map(property => (
        <PropertyCard key={property._id} property={property} onEdit={handleEdit} />
      ))}
    </div>
  );
};

export default EditPropertyView;
