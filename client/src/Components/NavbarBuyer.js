import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext.js'
import logo from './images/logo.png'
import MortgageCalculator from './mortgageCalculator'

function NavbarBuyer () {
  const { logout, user } = useContext(UserContext)
  const [isPopupOpen, setPopupOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const openPopup = () => {
    setPopupOpen(true)
  }

  const closePopup = () => { // eslint-disable-line
    setPopupOpen(false)
  }

  return (
    <nav data-testid='navbar' className='Navbar'>
      <div>
        <a data-testid='navbar-logo' href='/'>
          <img className='Navbar-logo' src={logo} alt='logo' width='100%' height='100%' />
        </a>
      </div>
      <a href='/'>
        <p className='companyName'>
          <h1>Pioneers</h1>
        </p>
      </a>
      <ul>
        <div>
          <li className='Navlinks' data-testid='MortgageCalculator' onClick={openPopup}>MortgageCalculator</li>
          {isPopupOpen && <MortgageCalculator />}
        </div>
        <a href='/searchBrokers'>
          <li className='Navlinks'>Find Brokers</li>
        </a>
        <a href='/'>
          <li className='Navlinks'>Properties</li>
        </a>
        {user
          ? (
            <li className='Navlinks' onClick={handleLogout}>
              Logout
            </li>
            )
          : (
            <a href='/login'>
              <li className='Navlinks'>Login</li>
            </a>
            )}
      </ul>
    </nav>
  )
}

export default NavbarBuyer
