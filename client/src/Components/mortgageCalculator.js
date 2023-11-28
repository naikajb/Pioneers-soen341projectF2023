import React, { useState } from 'react'
import './styles/listingDet.css' // Adjust the path accordingly

const MortgageCalculatorPopup = ({ onClose }) => {
  const [homePrice, setHomePrice] = useState('')
  const [downPayment, setDownPayment] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [annualInterestRate, setAnnualInterestRate] = useState('')
  const [monthlyPayment, setMonthlyPayment] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const calculateMortgage = () => {
    // Validate input
    if (!homePrice || !downPayment || !loanTerm || !annualInterestRate) {
      setErrorMessage('Please fill in all fields.')
      return
    }

    const principal = parseFloat(homePrice) - parseFloat(downPayment)
    const monthlyInterestRate = parseFloat(annualInterestRate) / 12 / 100
    const numberOfPayments = parseFloat(loanTerm) * 12

    if (isNaN(principal) || isNaN(monthlyInterestRate) || isNaN(numberOfPayments)) {
      setErrorMessage('Please enter valid numbers for all fields.')
      return
    }

    // Mortgage calculation
    const monthlyPayment =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))

    setMonthlyPayment(monthlyPayment.toFixed(2))
    setErrorMessage('')
  }

  return (
    <div className='popup' data-testid='MortgageCalculatorPopup'>
      <div className='popup-content'>
        <span className='close' onClick={onClose}>&times;</span>

        <div className='form-group'>
          <h2 className='section-title'>Mortgage Calculator</h2>
        </div>

        <div className='form-group'>
          <label>
            Home Price:
            <input
              type='number'
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Down Payment:
            <input
              type='number'
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Loan Term (years):
            <input
              type='number'
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </label>
        </div>

        <div className='form-group'>
          <label>
            Annual Interest Rate (%):
            <input
              type='number'
              step='0.01'
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
            />
          </label>
        </div>

        <button onClick={calculateMortgage}>Calculate</button>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {monthlyPayment !== null && (
          <div className='result'>
            <h3>Monthly Mortgage Payment:</h3>
            <p>${monthlyPayment}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MortgageCalculatorPopup
