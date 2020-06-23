import React from 'react';
import { t } from 'ttag';

const SearchBar = ({
  placeholder,
  updateQueryParams,
  q
}) => {
  const onChange = e => {
    const value = e.currentTarget.value;
    updateQueryParams({
      q: value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return /*#__PURE__*/React.createElement("form", {
    className: "search-bar",
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t`Search`), /*#__PURE__*/React.createElement("div", {
    className: "input"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrapper"
  }, /*#__PURE__*/React.createElement("i", {
    className: "material-icons"
  }, "search"), /*#__PURE__*/React.createElement("input", {
    id: "search-input",
    type: "search",
    className: "search-input",
    placeholder: placeholder,
    onChange: onChange,
    value: q || ''
  }))));
};

export default SearchBar;