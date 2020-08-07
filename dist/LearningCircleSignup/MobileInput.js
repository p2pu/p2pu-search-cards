import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
import ReactTelInput from 'react-telephone-input';
import 'react-telephone-input/css/default.css';
export var MobileInput = function MobileInput(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "input-with-label form-group ".concat(props.classes)
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: props.name
  }, "".concat(props.label, " ").concat(props.required ? '*' : '')), /*#__PURE__*/React.createElement(ReactTelInput, {
    placeholder: props.placeholder,
    flagsImagePath: "https://learningcircles.p2pu.org/static/images/flags.png",
    value: props.value || props.defaultValue,
    onChange: function onChange(phone) {
      return props.handleChange(_defineProperty({}, props.name, phone));
    },
    defaultCountry: "us"
  }), props.errorMessage && /*#__PURE__*/React.createElement("div", {
    className: "error-message minicaps"
  }, props.errorMessage));
};