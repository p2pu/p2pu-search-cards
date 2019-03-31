import React from 'react'

const SearchBar = ({ placeholder, updateQueryParams, q }) => {
  const onChange = (e) => {
    const value = e.currentTarget.value;
    updateQueryParams({q: value});
  }

  const onSubmit = e => {
    e.preventDefault();
  }

  return(
    <form className='search-bar' onSubmit={onSubmit}>
      <div className='label'>
        Search
      </div>
      <div className="input">
        <div className='wrapper'>
          <i className="material-icons">search</i>
          <input
            id="search-input"
            type="search"
            className='search-input'
            placeholder={placeholder}
            onChange={onChange}
            value={q||''}
          />
        </div>
      </div>
    </form>
  )
}

export default SearchBar;