import React from 'react'
import SearchBar from './SearchBar'
import FiltersSection from '../Filters/FiltersSection'
import SortSection from '../Filters/SortSection'

const SearchAndFilter = (props) => {
  const noResults = props.searchResults.length === 0;

  return(
    <div className='search-container'>
      { noResults && <div className='overlay'></div> }
      <SearchBar
        placeholder={props.placeholder}
        updateQueryParams={props.updateQueryParams}
        q={props.q}
      />
      <div className="filters-container">
        <FiltersSection
          {...props}
        />
        {
          props.sortCollection &&
          <SortSection { ...props } />
        }
      </div>
    </div>
  )
}

export default SearchAndFilter;