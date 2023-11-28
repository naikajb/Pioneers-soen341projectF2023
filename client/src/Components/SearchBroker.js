import React, { useState, useEffect } from 'react'
import axios from 'axios'

const BrokerList = () => {
  const [brokers, setBrokers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios.get('/api/brokers')
      .then(response => {
        setBrokers(response.data)
      })
      .catch(error => {
        console.error('Error fetching brokers:', error)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const contactBroker = (broker) => {
    const emailTemplate = `Hi ${broker.name},\n\nI am interested in one of your listings. Can you please provide me with more information?\n\nThank you,\n[Your Name]`
    const mailToLink = `mailto:${broker.email}?subject=Regarding%20Your%20Listing&body=${encodeURIComponent(emailTemplate)}`
    window.open(mailToLink)
  }

  const filteredBrokers = brokers.filter((broker) =>
    broker.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className='search-main-container'>
      <div className='search-container'>
        <input
          className='broker-search-bar'
          type='text'
          placeholder='Search for a broker...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {filteredBrokers.map((broker) => (
        <ul className='broker-list' key={broker._id}>
          <li>{broker.name}</li>
          <li>Email: {broker.email}</li>
          <li>Contact Nb: {broker.contact}</li>
          <li>Active Listings: {broker.activeListings}</li>
          <li><button onClick={() => contactBroker(broker)}>Contact</button></li>
        </ul>
      ))}
    </div>
  )
}

export default BrokerList
