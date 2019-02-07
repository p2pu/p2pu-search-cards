import React from 'react'
import Search from "@material-ui/icons/Search"

const SearchBar = ({ placeholder, updateQueryParams, q }) => {
  const onChange = (e) => {
    const value = e.currentTarget.value;
    updateQueryParams({q: value});
  }

  return(
    <form className='search-bar'>
      <div className='label'>
        Search
      </div>
      <div className="input">
        <div className='wrapper'>
          <Search />
          <input
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