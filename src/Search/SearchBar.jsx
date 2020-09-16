import React from 'react';
import {t} from 'ttag';

const SearchBar = ({ placeholder, updateQueryParams, q }) => {
  const onChange = (e) => {
    const value = e.currentTarget.value
    const query = value.replace(/^\s+/g, '');
    updateQueryParams({ q: query });
  }

  const onSubmit = e => {
    e.preventDefault();
  }

  return(
    <form className='search-bar' onSubmit={onSubmit}>
      <div className='label'>
        {t`Search`}
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
