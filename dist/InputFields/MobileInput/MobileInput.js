import _extends from "@babel/runtime/helpers/extends";
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactTelInput from 'react-telephone-input';
import 'react-telephone-input/css/default.css';
import './mobile-input.css';
import InputWrapper from '../InputWrapper';

const MobileInput = props => {
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
    ...rest
  } = props;
  const inputEl = useRef();

  const onChange = (phone, country) => {
    setBrowserError(null);
    handleChange({
      [name]: phone
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
    disabled: disabled,
    errorMessage: combinedErrorMessage,
    helpText: helpText,
    classes: classes
  }, /*#__PURE__*/React.createElement(ReactTelInput, _extends({
    ref: inputEl,
    onBlur: checkValidity,
    placeholder: placeholder,
    flagsImagePath: "https://learningcircles.p2pu.org/static/images/flags.png",
    id: name,
    value: value,
    onChange: onChange,
    required: required,
    disabled: disabled,
    defaultCountry: "us"
  }, rest)));
};

MobileInput.defaultProps = {
  type: 'text',
  value: "",
  required: false,
  disabled: false,
  label: 'Text input',
  classes: '',
  handleChange: input => console.log("Implement a function to save input", input)
};
MobileInput.propTypes = {
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
export default MobileInput;