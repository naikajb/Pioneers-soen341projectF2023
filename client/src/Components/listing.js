import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

// this is a test comment 21/11/2021

function ListingDetails () {
  const location = useLocation()
  const { id } = location.state || {}
  const [listing, setListing] = useState(null)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState()
  const [firstname, setFirstName] = useState()
  const [lastname, setLastName] = useState()
  const [offer, setOffer] = useState()
  const [date, setDate] = useState()
  const [time, setTime] = useState()

  // fetch property details to be displayed for property that was clicked (id)
  const fetchProperty = async () => {
    try {
      const response = await axios.get('/api/properties')
      console.log('Fetched data:', response.data)

      const property = response.data.find((property) => property._id === id)
      if (property) {
        console.log('Found property bathroom:', property.bathroom)
        setListing(property)
      } else {
        console.log('Property not found with id:', id)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchProperty()
  }, [id])

  const [isPopupOpen, setPopupOpen] = useState(false)
  const [isPopupOpen2, setPopupOpen2] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    appointmentDate: '',
    time: ''
  })

  async function makeOffer (event) {
    event.preventDefault()
    try {
      const response = await fetch('/api/makeOffers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        withCredentials: true,

        body: JSON.stringify({
          email,
          firstname,
          lastname,
          offer,
          property: id
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Offer Made')
        setError('Offer Made')
      } else {
        setError(data.error)
      }
    } catch (error) {
      console.error('Error during making offer:', error)
      setError('Internal server error')
    }
  }

  async function BookAppointment (event) {
    event.preventDefault()
    try {
      const response = await fetch('/api/bookAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        withCredentials: true,

        body: JSON.stringify({
          email,
          firstname,
          lastname,
          date,
          time,
          property: id
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Appointment Booked')
        setError('Appointment Booked')
      } else {
        setError(data.error)
      }
    } catch (error) {
      console.error('Error during making offer:', error)
      setError('Internal server error')
    }
  }

  const openPopup = () => {
    setPopupOpen(true)
  }

  const closePopup = () => {
    setPopupOpen(false)
  }
  const openPopup2 = () => {
    setPopupOpen2(true)
  }

  const closePopup2 = () => {
    setPopupOpen2(false)
  }

  const handleFormChange = (event) => {// eslint-disable-line
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (event) => { // eslint-disable-line
    event.preventDefault()

    // You can handle form submission here or make an API request to submit the data
    console.log('Form data submitted:', formData)
    closePopup() // Close the popup after submission
  }

  return (
    <div className='main-content'>
      <div className='flex-container'>
        <div className='left-column'>
          {
          listing
            ? (
              <div>
                <h2 className='section-title'>Property Details</h2>
                <p className='detail'>Description: {listing.description}</p>
                <p className='detail'>Price: {listing.price}</p>
                <p className='detail'>Bedrooms: {listing.bedroom}</p>
                <p className='detail'>Bathrooms: {listing.bathroom}</p>
                {/* Add more listing details as needed */}
                <h2 className='section-title'>Amenities</h2>
                <ul className='amenities-list'>
                  {listing.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
              )
            : (
              <div>Loading...</div>
              )
          }
        </div>
        <div className='right-column'>
          <div>
            <h2 className='section-title'>Broker Details</h2>
            <p className='detail'>Name: {listing?.broker?.name}</p>
            <p className='detail'>Contact: {listing?.broker?.contact}</p>
            {/* Add more broker details as needed */}
          </div>
          <button className='cta-button' button data-testid='BookAppointment' onClick={openPopup}>
            Book an Appointment
          </button>

          {isPopupOpen && (
            <div id='popup' className='popup'>
              <div className='popup-content'>
                <span className='close' onClick={closePopup}>&times;</span>
                <h2 className='section-title'>Book an Appointment</h2>
                <form>
                  <header> {error && <div className='error-message'>{error}</div>}</header>
                  <div className='form-group'>
                    <label htmlFor='firstname'>First Name:</label>
                    <input type='text' id='firstname' name='firstname' required value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='lastname'>Last Name:</label>
                    <input type='text' id='lastname' name='lastname' required value={lastname} onChange={(e) => setLastName(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='appointmentDate'>Select a date:</label>
                    <input type='date' id='appointmentDate' name='appointmentDate' required value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <label>Select your preferred time:</label><br />
                    <label htmlFor='morning'>
                      <input type='radio' id='morning' name='time' value='morning' onChange={(e) => setTime(e.target.value)} /> Morning
                    </label><br />
                    <label htmlFor='afternoon'>
                      <input type='radio' id='afternoon' name='time' value='afternoon' onChange={(e) => setTime(e.target.value)} /> Afternoon
                    </label><br />
                    <label htmlFor='evening'>
                      <input type='radio' id='evening' name='time' value='evening' onChange={(e) => setTime(e.target.value)} /> Evening
                    </label>
                  </div>

                  <div className='form-group'>
                    <button className='cta-button' type='submit' onClick={BookAppointment}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <button className='cta-button' button data-testid='MakeOffer' onClick={openPopup2}>

            Make an Offer
          </button>
          {isPopupOpen2 && (
            <div id='popup' className='popup'>
              <div className='popup-content'>
                <span className='close' onClick={closePopup2}>&times;</span>
                <h2 className='section-title'>Make an Offer</h2>
                <form>
                  <header> {error && <div className='error-message'>{error}</div>}</header>
                  <div className='form-group'>
                    <label htmlFor='firstname'>First Name:</label>
                    <input type='text' id='firstname' name='firstname' required value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='lastname'>Last Name:</label>
                    <input type='text' id='lastname' name='lastname' required value={lastname} onChange={(e) => setLastName(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' id='email' name='email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <label htmlFor='offer'>Offer:</label>
                    <input type='text' id='offer' name='offer' required value={offer} onChange={(e) => setOffer(e.target.value)} />
                  </div>

                  <div className='form-group'>
                    <button className='cta-button' type='submit' onClick={makeOffer}>Submit</button>
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
  )
}

export default ListingDetails
