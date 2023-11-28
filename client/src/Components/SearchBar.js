import React from 'react'
import './styles/SearchBar.css' // Import the CSS for the SearchBar

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className='search-container'>
      <input
        type='text'
        className='search-input'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBar
