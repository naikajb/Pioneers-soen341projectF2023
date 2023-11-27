import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/EditPropertyView.css';

// Modal component for editing property details
const EditPropertyModal = ({ property, onSave, onCancel }) => {
  const [editFormData, setEditFormData] = useState(property);

  // Update the property in the backend whenever editFormData changes
  useEffect(() => {
    const timer = setTimeout(() => {
      onSave(editFormData);
    }, 500); // Debounce the update by 500ms

    return () => clearTimeout(timer);
  }, [editFormData, onSave]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <div className="edit-modal-header">
          <h2>Edit Property</h2>
        </div>
        <div className="edit-modal-body">
          <form className="edit-form">
            <label>Price</label>
            <input type="text" name="price" value={editFormData.price} onChange={handleChange} />

            <label>Address</label>
            <input type="text" name="address" value={editFormData.address} onChange={handleChange} />

            <label>Bedrooms</label>
            <input type="number" name="bedroom" value={editFormData.bedroom} onChange={handleChange} />

            <label>Bathrooms</label>
            <input type="number" name="bathroom" value={editFormData.bathroom} onChange={handleChange} />

            <label>Description</label>
            <textarea name="description" value={editFormData.description} onChange={handleChange} />

            <div className="edit-modal-footer">
              <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

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
  const [editingProperty, setEditingProperty] = useState(null);

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
    setEditingProperty(property);
  };

  const handleSave = (updatedProperty) => {
    axios.put(`/api/properties/${updatedProperty._id}`, updatedProperty)
      .then(response => {
        // Replace the updated property in the state
        setProperties(properties.map(prop => 
          prop._id === updatedProperty._id ? response.data : prop
        ));
        // No need to close the modal here since we're autosaving
      })
      .catch(error => {
        console.error('Error updating property:', error);
      });
  };

  const handleCancel = () => {
    setEditingProperty(null); // Close modal without saving
  };

  return (
    <div className="properties-container">
      {properties.map(property => (
        <PropertyCard key={property._id} property={property} onEdit={handleEdit} />
      ))}
      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditPropertyView;
