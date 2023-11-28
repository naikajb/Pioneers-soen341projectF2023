import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/broker.css'

// Individual Broker Component
const Broker = ({ broker, onUpdate, onDelete }) => {
  const handleNameChange = (e) => {
    onUpdate({ ...broker, name: e.target.value })
  }

  const handleContactChange = (e) => {
    onUpdate({ ...broker, contact: e.target.value })
  }

  const handleEmailChange = (e) => {
    onUpdate({ ...broker, email: e.target.value })
  }

  const handleActiveListingsChange = (e) => {
    onUpdate({ ...broker, activeListings: Number(e.target.value) })
  }

  return (
    <div className='broker-item'>
      <input
        className='broker-input'
        placeholder='Name'
        value={broker.name}
        onChange={handleNameChange}
      />
      <input
        className='broker-input'
        placeholder='Contact Number'
        value={broker.contact}
        onChange={handleContactChange}
      />
      <input
        className='broker-input'
        placeholder='Email'
        value={broker.email}
        onChange={handleEmailChange}
      />
      <input
        type='number'
        className='broker-input'
        placeholder='Active Listings'
        value={broker.activeListings}
        onChange={handleActiveListingsChange}
      />
      <button className='button' onClick={() => onDelete(broker)}>Delete</button>
    </div>
  )
}

// Brokers List Component
const BrokersList = () => {
  const [brokers, setBrokers] = useState([])

  useEffect(() => {
    axios.get('/api/brokers')
      .then(response => {
        setBrokers(response.data)
      })
      .catch(error => {
        console.error('Error fetching brokers:', error)
      })
  }, [])

  const handleAddBroker = () => {
    const newBrokerData = { name: '', contact: '', email: '', activeListings: 0 }
    axios.post('/api/brokers', newBrokerData)
      .then(response => {
        setBrokers([...brokers, response.data])
      })
      .catch(error => {
        console.error('Error adding new broker:', error)
      })
  }

  const handleUpdateBroker = (updatedBroker) => {
    axios.put(`/api/brokers/${updatedBroker._id}`, updatedBroker)
      .then(response => {
        const newBrokers = brokers.map(b =>
          b._id === updatedBroker._id ? updatedBroker : b
        )
        setBrokers(newBrokers)
      })
      .catch(error => {
        console.error('Error updating broker:', error)
      })
  }

  const handleDeleteBroker = (broker) => {
    if (broker.activeListings > 0) {
      alert(`You cannot delete the Broker ${broker.name} with ${broker.activeListings} Active listings! .`)
      return
    }

    axios.delete(`/api/brokers/${broker._id}`)
      .then(() => {
        setBrokers(brokers.filter(b => b._id !== broker._id))
        alert('The broker deleted successfully .')
      })
      .catch(error => {
        console.error('Error deleting broker:', error)
        alert('There was an error deleting the broker.')
      })
  }

  return (
    <div className='container'>
      <h1 className='title'>List of Brokers</h1>
      {brokers.map(broker => (
        <Broker
          key={broker._id}
          broker={broker}
          onUpdate={handleUpdateBroker}
          onDelete={handleDeleteBroker}
        />
      ))}
      <button className='button' onClick={handleAddBroker}>Add New Broker</button>
    </div>
  )
}

export default BrokersList
