import React from 'react';
import SearchBar from './SearchBar';
import FiltersSection from '../Filters/FiltersSection';
import SortSection from '../Filters/SortSection';

const SearchAndFilter = props => {
  const noResults = props.searchResults.length === 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "search-container"
  }, /*#__PURE__*/React.createElement(SearchBar, {
    placeholder: props.placeholder,
    updateQueryParams: props.updateQueryParams,
    q: props.q
  }), /*#__PURE__*/React.createElement("div", {
    className: "filters-container"
  }, /*#__PURE__*/React.createElement(FiltersSection, props), props.sortCollection && /*#__PURE__*/React.createElement(SortSection, props)));
};

export default SearchAndFilter;