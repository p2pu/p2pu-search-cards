import React from 'react';
import ReactTelInput from 'react-telephone-input';
import 'react-telephone-input/css/default.css';
export const MobileInput = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: `input-with-label form-group ${props.classes}`
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: props.name
  }, `${props.label} ${props.required ? '*' : ''}`), /*#__PURE__*/React.createElement(ReactTelInput, {
    placeholder: props.placeholder,
    flagsImagePath: "https://learningcircles.p2pu.org/static/images/flags.png",
    value: props.value || props.defaultValue,
    onChange: phone => props.handleChange({
      [props.name]: phone
    }),
    defaultCountry: "us"
  }), props.errorMessage && /*#__PURE__*/React.createElement("div", {
    className: "error-message minicaps"
  }, props.errorMessage));
};