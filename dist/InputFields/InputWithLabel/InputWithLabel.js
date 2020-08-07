import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import InputWrapper from '../InputWrapper';

var InputWithLabel = function InputWithLabel(props) {
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      browserError = _useState2[0],
      setBrowserError = _useState2[1];

  var label = props.label,
      name = props.name,
      id = props.id,
      value = props.value,
      handleChange = props.handleChange,
      required = props.required,
      disabled = props.disabled,
      classes = props.classes,
      type = props.type,
      errorMessage = props.errorMessage,
      helpText = props.helpText,
      placeholder = props.placeholder,
      rest = _objectWithoutProperties(props, ["label", "name", "id", "value", "handleChange", "required", "disabled", "classes", "type", "errorMessage", "helpText", "placeholder"]);

  var inputEl = useRef();

  var onChange = function onChange(e) {
    setBrowserError(null);
    handleChange(_defineProperty({}, name, e.currentTarget.value));
  };

  var checkValidity = function checkValidity() {
    var validationMessage = inputEl.current.validationMessage;
    setBrowserError(validationMessage);
  };

  var combinedErrorMessage = [browserError, errorMessage].filter(Boolean).join("; ");
  return /*#__PURE__*/React.createElement(InputWrapper, {
    label: label,
    name: name,
    id: id,
    required: required,
    disabled: disabled,
    errorMessage: combinedErrorMessage,
    helpText: helpText,
    classes: classes
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputEl,
    type: type,
    id: name,
    value: value,
    onChange: onChange,
    onBlur: checkValidity,
    placeholder: placeholder,
    required: required,
    disabled: disabled,
    className: "form-control"
  }, rest)));
};

InputWithLabel.defaultProps = {
  type: 'text',
  value: "",
  required: false,
  disabled: false,
  label: 'Text input',
  classes: '',
  handleChange: function handleChange(input) {
    return console.log("Implement a function to save input", input);
  }
};
InputWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  classes: PropTypes.string,
  placeholder: PropTypes.string
};
export default InputWithLabel;