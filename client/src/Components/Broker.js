import React, { useState } from 'react';
import './broker.css';

// Individual Broker Component
const Broker = ({ broker, onUpdate, onDelete }) => {
  return (
    <div className="broker-item">
      <input 
        className="broker-input"
        placeholder="Name"
        value={broker.name} 
        onChange={(e) => onUpdate({ ...broker, name: e.target.value })}
      />
      <input 
        className="broker-input"
        placeholder="Contact Number"
        value={broker.contact} 
        onChange={(e) => onUpdate({ ...broker, contact: e.target.value })}
      />
      <button className="button" onClick={() => onDelete(broker.id)}>Delete</button>
    </div>
  );
};

// Brokers List Component
const BrokersList = () => {
  const [brokers, setBrokers] = useState([
    { id: 1, name: 'James Thompson', contact: '+1-123-456-7890' },
    { id: 2, name: 'Emily Watson', contact: '+1-234-567-8901' },
    { id: 3, name: 'Michael Rodriguez', contact: '+1-345-678-9012' },
    { id: 4, name: 'Sarah Kim', contact: '+1-456-789-0123' }
  ]);

  

  const handleUpdateBroker = (updatedBroker) => {
    const newBrokers = brokers.map(broker => 
      broker.id === updatedBroker.id ? updatedBroker : broker
    );
    setBrokers(newBrokers);
  };

  const handleDeleteBroker = (id) => {
    const newBrokers = brokers.filter(broker => broker.id !== id);
    setBrokers(newBrokers);
  };

  const handleAddBroker = () => {
    const newBroker = { id: Date.now(), name: '', contact: '' };
    setBrokers([...brokers, newBroker]);
  };

  const printBrokersList = () => {
    let brokerString = "Updated List of Brokers:\n";
    brokers.forEach(broker => {
      brokerString += `Name: ${broker.name}, Contact: ${broker.contact}\n`;
    });
    alert(brokerString);
  };

  const [showPopup, setShowPopup] = useState(false);
  // Handler for the popup form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle the form submission, e.g., add a new broker
    // Close the popup after submission
    setShowPopup(false);
  };

  return (
    <div className="container">
      <h1 className="title">List of Brokers</h1>
      {brokers.map(broker => (
        <Broker 
          key={broker.id} 
          broker={broker} 
          onUpdate={handleUpdateBroker}
          onDelete={handleDeleteBroker}
        />
      ))}
      <button className="button" onClick={handleAddBroker}>Add New Broker</button>
      <button className="button" onClick={printBrokersList} style={{ marginLeft: '10px' }}>Print Updated List</button>
      <button className="button" onClick={() => setShowPopup(true)}>Add New Broker via Popup</button>

      {/* Popup Form */}
      {showPopup && (
  <div className="overlay">
    <div className="popup-inner">
      <h2>Add New Broker</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="brokerName" required />
        </label>
        <label>
          Contact Number:
          <input type="tel" name="brokerContact" required />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  </div>
)}
    </div>
  );
};

export default BrokersList;
export { Broker };
