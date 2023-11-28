import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext.js';
import axios from 'axios';

function ManageOffers() {
  const [offers, setOffers] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const handleAcceptReject = async (selectedOffer, action) => {
    try {
      const updatedOffers = await axios.put(`/api/offers/${selectedOffer.id}`, {
        action, // 'accept' or 'reject'
      });

      setOffers(updatedOffers.data);
    } catch (error) {
      console.error('Error updating offer:', error);
    }
  };

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/offers');
        console.log('API Response:', res.data); // Log the response
        const offersData = res.data;

        // Fetch property details for each offer
        const offersWithProperties = await Promise.all(
          offersData.map(async (offer) => {
            const propertyResponse = await axios.get(`/api/properties/${offer.property}`);
            const property = propertyResponse.data;

            return {
              ...offer,
              property,
            };
          })
        );

        setOffers(offersWithProperties);
        setLoading(false);
      } catch (err) {
        console.log('Error fetching the offers', err);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <p className='loading-offers'>Loading offers...</p>;
  }

  if (!offers) {
    // Render a loading state or handle the case where offers is still null
    return <p className='loading-offers'>No offers available.</p>;
  }

  const groupedOffers = {};

  offers.forEach((offer) => {
    if (offer.property && offer.property.broker && offer.property.broker.name === user.name) {
      if (!groupedOffers[offer.property.address]) {
        groupedOffers[offer.property.address] = [];
      }
      groupedOffers[offer.property.address].push(offer);
    }
  });

  return (
    <div>
      <h1 data-testid='manage-offers-page' className='title-offers-page'>
        Manage Offers
      </h1>
      {Object.entries(groupedOffers).map(([property, offers]) => (
        <div className='offers' key={property}>
          <h2>{property}</h2>
          <ul>
            {offers.map((offer, index) => (
              <li className='offer-detail' key={index}>
                <p><b>Amount: </b>{offer.offer}$</p>
                <p><b>Buyer: </b>{offer.user}</p>
                <p><b>Status: </b>{offer.status}</p>
                {/* Add more details based on your data structure */}
                {offer.status === 'Pending' ? (
                  <div>
                    <button
                      className='accept-butt'
                      onClick={() => handleAcceptReject(offer, 'accept')}
                      disabled={offers.some((o) => o.status === 'Accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className='reject-butt'
                      onClick={() => handleAcceptReject(offer, 'reject')}
                      disabled={offers.some((o) => o.status === 'Accepted')}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <p>Offer already {offer.status}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ManageOffers
