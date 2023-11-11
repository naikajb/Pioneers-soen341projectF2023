import React from 'react';
import { getByText, render, fireEvent } from '@testing-library/react';
import App from './App';
import NavbarBuyer from './Components/Navbar.js';
import { screen } from '@testing-library/react';
import { getByTestId} from '@testing-library/react';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import NavbarBroker from './Components/NavbarBroker.js';


test('App renders correctly', () => {
    const { getByTestId } = render(
        <App/>
    );
    const companyName = getByTestId('navbar');
    expect(companyName).toBeInTheDocument();
});

test('Buyer NavBar renders correctly', () => {
    const { getByTestId } = render(
        <NavbarBuyer/>
    );
    const companyName = getByTestId('navbar');
    expect(companyName).toBeInTheDocument();
});

test('Broker NavBar renders correctly', () => {
    const { getByTestId } = render(
        <NavbarBroker/>
    );
    
});

test('Manage Offers Button is present on Broker Navbar', () => {
    const { getByTestId } = render(
        <NavbarBroker/>
    );

    const manageOffersButton = getByTestId('manageOffersButton');
    
});

test('Clicking on the Manage Offers Button takes you to the Manage Offers Page', () => {
    const { getByTestId } = render(
        <NavbarBroker/>
    );

    const manageOffersButton = getByTestId('manageOffersButton');
    fireEvent.click(manageOffersButton);

    const manageOffersPage = screen.getByText(/Manage Offers/i);
    expect(manageOffersPage).toBeInTheDocument();
    
});