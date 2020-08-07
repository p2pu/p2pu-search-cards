import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import InputWrapper from '../InputWrapper';
var displayFormat = 'MMMM d, yyyy';

var formatDateString = function formatDateString(date) {
  var year = date.getFullYear();
  var month = "0".concat(date.getMonth() + 1).slice(-2);
  var day = "0".concat(date.getDate()).slice(-2);
  return "".concat(year, "-").concat(month, "-").concat(day);
};

var DatePickerWithLabel = function DatePickerWithLabel(props) {
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
      labelPosition = props.labelPosition,
      minDate = props.minDate,
      maxDate = props.maxDate,
      rest = _objectWithoutProperties(props, ["label", "name", "id", "value", "handleChange", "required", "disabled", "classes", "type", "errorMessage", "helpText", "placeholder", "labelPosition", "minDate", "maxDate"]);

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
  var min = minDate ? formatDateString(minDate) : null;
  var max = maxDate ? formatDateString(maxDate) : null;
  return /*#__PURE__*/React.createElement(InputWrapper, {
    label: label,
    name: name,
    id: id,
    required: required,
    errorMessage: combinedErrorMessage,
    helpText: helpText,
    classes: classes
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: inputEl,
    type: "date",
    id: name,
    value: value,
    onChange: onChange,
    onBlur: checkValidity,
    placeholder: "YYYY-MM-DD",
    required: required,
    disabled: disabled,
    className: "form-control",
    min: min,
    max: max,
    pattern: "\\d{4}-\\d{2}-\\d{2}"
  }, rest)));
};

DatePickerWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  value: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object
};
DatePickerWithLabel.defaultProps = {
  classes: "",
  label: "Time picker",
  handleChange: function handleChange(input) {
    return console.log("Implement a function to save selection", input);
  },
  required: false,
  disabled: false,
  value: "",
  maxDate: new Date(2999, 12, 31)
};
export default DatePickerWithLabel;