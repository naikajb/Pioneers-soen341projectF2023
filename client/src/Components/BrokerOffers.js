import React, { useState } from 'react'
import './styles/BrokerOffers.css' // Ensure this path is correct for your CSS file

// The Modal component
const OfferModal = ({ offer, onClose }) => {
  return (
    <div className='modal-backdrop'>
      <div className='modal-content'>
        <h2>Offer Details</h2>
        <p><strong>Price:</strong> {offer.price}</p>
        <p><strong>Buyer:</strong> {offer.buyer}</p>
        {/* Include other offer details as needed */}
        <div className='modal-actions'>
          <button onClick={() => onClose()}>Close</button>
          <button onClick={() => alert('Accept action to be implemented')}>Accept Offer</button>
          <button onClick={() => alert('Counter action to be implemented')}>Counter Offer</button>
          <button onClick={() => alert('Reject action to be implemented')}>Reject Offer</button>
        </div>
      </div>
    </div>
  )
}

// The Broker's main component with dummy offers
const BrokerOffers = () => {
  // Dummy offers defined within the component
  const dummyOffers = [
    { id: 1, buyer: 'John Doe', price: '$300,000' },
    { id: 2, buyer: 'Jane Smith', price: '$350,000' },
    { id: 3, buyer: 'Emma Johnson', price: '$250,000' },
    { id: 4, buyer: 'Olivia Williams', price: '$400,000' },
    { id: 5, buyer: 'Noah Brown', price: '$320,000' }
    // Add more offers as needed
  ]

  const [selectedOffer, setSelectedOffer] = useState(null)

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer)
  }

  const handleCloseModal = () => {
    setSelectedOffer(null)
  }

  return (
    <div className='offers-container'>
      <h1>Manage Offers</h1>
      <div className='offers-list'>
        {dummyOffers.map((offer) => (
          <div key={offer.id} className='offer-item' onClick={() => handleOfferClick(offer)}>
            Offer from {offer.buyer} - {offer.price}
          </div>
        ))}
      </div>

      {selectedOffer && <OfferModal offer={selectedOffer} onClose={handleCloseModal} />}
    </div>
  )
}

export default BrokerOffers
