import React from 'react'
import { getByText, render, fireEvent, screen, getByTestId } from '@testing-library/react' // eslint-disable-line
import App from './App'
import NavbarBuyer from './Components/Navbar.js'

import { toBeInTheDocument } from '@testing-library/jest-dom' // eslint-disable-line
import NavbarBroker from './Components/NavbarBroker.js'
import ListingDetails from './Components/listing.js'
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom'

import ManageOffers from './Components/ManageOffers'

test('App renders correctly', () => {
  const { getByTestId } = render(
    <App />
  )
  const companyName = getByTestId('navbar')
  expect(companyName).toBeInTheDocument()
})

test('Clicking on the Book An Appointment button shows you the popup', () => {
  const { getByTestId } = render(
    <MemoryRouter> {/* Wrap your component with MemoryRouter */}
      <ListingDetails />
    </MemoryRouter>
  )

  const manageOffersButton = getByTestId('BookAppointment')
  fireEvent.click(manageOffersButton)

  const manageOffersPage = screen.getByText(/Submit/i)
  expect(manageOffersPage).toBeInTheDocument()
})

test('Clicking on the Make an offer button shows you the popup', () => {
  const { getByTestId } = render(
    <MemoryRouter> {/* Wrap your component with MemoryRouter */}
      <ListingDetails />
    </MemoryRouter>
  )

  const manageOffersButton = getByTestId('MakeOffer')
  fireEvent.click(manageOffersButton)

  const manageOffersPage = screen.getByText(/Submit/i)
  expect(manageOffersPage).toBeInTheDocument()
})

test('Clicking MortgageCalculator opens the popup', () => {
  // Render the NavbarBuyer component
  render(
    // Wrap your component with MemoryRouter
    <MemoryRouter>
      <NavbarBuyer />
    </MemoryRouter>
  )

  // Click the "MortgageCalculator" link
  fireEvent.click(screen.getByTestId('MortgageCalculator'))

  // Assertions
  expect(screen.getByTestId('MortgageCalculatorPopup')).toBeInTheDocument()
})

test('Clicking "Manage Offers" in the navbar should navigate to the ManageOffers page', async () => {
  render(
    <Router>
      <NavbarBroker />
      <ManageOffers />
    </Router>
  )

  // Find the "Manage Offers" link and click it
  fireEvent.click(screen.getByTestId('ManageOffers'))

  // Use getByTestId to get the element with the unique identifier
  // const manageOffersPage = screen.getByTestId('manage-offers-page');
  const manageOffersPage = await screen.findByTestId('manage-offers-page')

  // Verify that the ManageOffers page is loaded
  expect(manageOffersPage).toBeInTheDocument()
})

// test
