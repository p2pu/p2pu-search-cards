import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["Search"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import { t } from 'ttag';

var SearchBar = function SearchBar(_ref) {
  var placeholder = _ref.placeholder,
      updateQueryParams = _ref.updateQueryParams,
      q = _ref.q;

  var onChange = function onChange(e) {
    var value = e.currentTarget.value.trim();
    updateQueryParams({
      q: value
    });
  };

  var onSubmit = function onSubmit(e) {
    e.preventDefault();
  };

  return /*#__PURE__*/React.createElement("form", {
    className: "search-bar",
    onSubmit: onSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, t(_templateObject())), /*#__PURE__*/React.createElement("div", {
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