import React from 'react';
import { getByText, render, fireEvent } from '@testing-library/react';
import App from './App';
import NavbarBuyer from './Components/Navbar.js';
import { screen } from '@testing-library/react';
import { getByTestId} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import NavbarBroker from './Components/NavbarBroker.js';
import ListingDetails from './Components/listing.js';
import { MemoryRouter } from 'react-router-dom';

test('App renders correctly', () => {
    const { getByTestId } = render(
        <App/>
    );
    const companyName = getByTestId('navbar');
    expect(companyName).toBeInTheDocument();
});

test('Clicking on the Book An Appointment button shows you the popup', () => {
    const { getByTestId } = render(
      <MemoryRouter> {/* Wrap your component with MemoryRouter */}
        <ListingDetails />
      </MemoryRouter>
    );
  
    const manageOffersButton = getByTestId('BookAppointment');
    fireEvent.click(manageOffersButton);
  
    const manageOffersPage = screen.getByText(/Submit/i);
    expect(manageOffersPage).toBeInTheDocument();
  });

  test('Clicking on the Make an offer button shows you the popup', () => {
    const { getByTestId } = render(
      <MemoryRouter> {/* Wrap your component with MemoryRouter */}
        <ListingDetails />
      </MemoryRouter>
    );
  
    const manageOffersButton = getByTestId('MakeOffer');
    fireEvent.click(manageOffersButton);
  
    const manageOffersPage = screen.getByText(/Submit/i);
    expect(manageOffersPage).toBeInTheDocument();
  });
