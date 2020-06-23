import _extends from "@babel/runtime/helpers/extends";
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import InputWrapper from '../InputWrapper';
const displayFormat = 'MMMM d, yyyy';

const formatDateString = date => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

const DatePickerWithLabel = props => {
  const [browserError, setBrowserError] = useState();
  const {
    label,
    name,
    id,
    value,
    handleChange,
    required,
    disabled,
    classes,
    type,
    errorMessage,
    helpText,
    placeholder,
    labelPosition,
    minDate,
    ...rest
  } = props;
  const inputEl = useRef();

  const onChange = e => {
    setBrowserError(null);
    handleChange({
      [name]: e.currentTarget.value
    });
  };

  const checkValidity = () => {
    const validationMessage = inputEl.current.validationMessage;
    setBrowserError(validationMessage);
  };

  const combinedErrorMessage = [browserError, errorMessage].filter(Boolean).join("; ");
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
    min: formatDateString(minDate),
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
  minDate: PropTypes.object
};
DatePickerWithLabel.defaultProps = {
  classes: "",
  label: "Time picker",
  handleChange: input => console.log("Implement a function to save selection", input),
  required: false,
  disabled: false,
  value: ""
};
export default DatePickerWithLabel;