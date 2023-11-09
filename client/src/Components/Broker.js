import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/broker.css';

// Individual Broker Component
const Broker = ({ broker, onUpdate, onDelete }) => {
  const handleNameChange = (e) => {
    onUpdate({ ...broker, name: e.target.value });
  };

  const handleContactChange = (e) => {
    onUpdate({ ...broker, contact: e.target.value });
  };

  const handleEmailChange = (e) => {
    onUpdate({ ...broker, email: e.target.value });
  };

  return (
    <div className="broker-item">
      <input
        className="broker-input"
        placeholder="Name"
        value={broker.name}
        onChange={handleNameChange}
      />
      <input
        className="broker-input"
        placeholder="Contact Number"
        value={broker.contact}
        onChange={handleContactChange}
      />
      <input // New input for email
        className="broker-input"
        placeholder="Email"
        value={broker.email}
        onChange={handleEmailChange}
      />
      <button className="button" onClick={() => onDelete(broker._id)}>Delete</button>
    </div>
  );
};

// Brokers List Component
const BrokersList = () => {
  const [brokers, setBrokers] = useState([]);

  useEffect(() => {
    axios.get('/api/brokers')
      .then(response => {
        setBrokers(response.data);
      })
      .catch(error => {
        console.error('Error fetching brokers:', error);
      });
  }, []);

  const handleAddBroker = () => {
    const newBrokerData = { name: '', contact: '', email: '' };
    axios.post('/api/brokers', newBrokerData)
      .then(response => {
        setBrokers([...brokers, response.data]);
      })
      .catch(error => {
        console.error('Error adding new broker:', error);
      });
  };

  const handleUpdateBroker = (updatedBroker) => {
    axios.put(`/api/brokers/${updatedBroker._id}`, updatedBroker)
      .then(response => {
        const newBrokers = brokers.map(broker =>
          broker._id === updatedBroker._id ? updatedBroker : broker
        );
        setBrokers(newBrokers);
      })
      .catch(error => {
        console.error('Error updating broker:', error);
      });
  };

  const handleDeleteBroker = (id) => {
    axios.delete(`/api/brokers/${id}`)
      .then(response => {
        const newBrokers = brokers.filter(broker => broker._id !== id);
        setBrokers(newBrokers);
      })
      .catch(error => {
        console.error('Error deleting broker:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="title">List of Brokers</h1>
      {brokers.map(broker => (
        <Broker
          key={broker._id}
          broker={broker}
          onUpdate={handleUpdateBroker}
          onDelete={handleDeleteBroker}
        />
      ))}
      <button className="button" onClick={handleAddBroker}>Add New Broker</button>
    </div>
  );
};

export default BrokersList;
