import React from 'react';
import PropTypes from 'prop-types';
import "./input_wrapper.css";

const InputWrapper = props => {
  const {
    id,
    name,
    label,
    labelPosition,
    required,
    disabled,
    errorMessage,
    helpText,
    classes,
    children
  } = props;
  const wrapperClasses = `form-group ${classes ? classes : ""} ${disabled ? "disabled" : ""}`;

  switch (labelPosition) {
    case 'left':
      return /*#__PURE__*/React.createElement("div", {
        className: wrapperClasses,
        id: id
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'baseline'
        }
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: name,
        className: "input-label left"
      }, label, required && '*'), /*#__PURE__*/React.cloneElement(children, {
        id: name,
        name,
        required
      })), helpText && /*#__PURE__*/React.createElement("div", {
        className: "form-text help-text"
      }, helpText), errorMessage && /*#__PURE__*/React.createElement("div", {
        className: "error-message minicaps"
      }, errorMessage));

    case 'right':
      return /*#__PURE__*/React.createElement("div", {
        className: wrapperClasses,
        id: id
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'baseline'
        }
      }, /*#__PURE__*/React.cloneElement(children, {
        id: name,
        name,
        required
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: name,
        className: "input-label right"
      }, label, required && '*')), helpText && /*#__PURE__*/React.createElement("div", {
        className: "form-text help-text"
      }, helpText), errorMessage && /*#__PURE__*/React.createElement("div", {
        className: "error-message minicaps"
      }, errorMessage));

    default:
      return /*#__PURE__*/React.createElement("div", {
        className: wrapperClasses,
        id: id
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: name,
        className: "input-label"
      }, label, required && '*'), helpText && /*#__PURE__*/React.createElement("div", {
        className: "form-text help-text"
      }, helpText), /*#__PURE__*/React.cloneElement(children, {
        id: name,
        name,
        required
      }), errorMessage && /*#__PURE__*/React.createElement("div", {
        className: "error-message minicaps"
      }, errorMessage));
  }
};

InputWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  classes: PropTypes.string
};
export default InputWrapper;