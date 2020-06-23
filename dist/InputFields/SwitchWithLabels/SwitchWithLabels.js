import _extends from "@babel/runtime/helpers/extends";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputWrapper from '../InputWrapper';
import "./switch.css";

const SwitchWithLabels = props => {
  const {
    falseLabel,
    trueLabel,
    label,
    name,
    id,
    required,
    disabled,
    errorMessage,
    helpText,
    classes,
    offColor,
    onColor,
    value,
    handleChange,
    ...rest
  } = props;
  const bgColor = value ? onColor : offColor;

  const onChange = event => {
    const checked = event.currentTarget.checked;
    handleChange({
      [name]: checked
    });
  };

  const onClickLabel = checked => {
    return () => {
      handleChange({
        [name]: checked
      });
    };
  };

  return /*#__PURE__*/React.createElement(InputWrapper, {
    label: label,
    name: name,
    id: id,
    required: required,
    disabled: disabled,
    errorMessage: errorMessage,
    helpText: helpText,
    classes: classes
  }, /*#__PURE__*/React.createElement("div", {
    className: "switch-container"
  }, /*#__PURE__*/React.createElement("span", {
    onClick: onClickLabel(false)
  }, falseLabel), /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("input", _extends({
    checked: value,
    onChange: onChange,
    className: "switch",
    type: "checkbox",
    disabled: disabled,
    required: required
  }, rest)), /*#__PURE__*/React.createElement("div", {
    className: `switch-background ${value ? 'on' : 'off'}`,
    style: {
      backgroundColor: bgColor
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "switch-button"
  }))), /*#__PURE__*/React.createElement("span", {
    onClick: onClickLabel(true)
  }, trueLabel)));
};

SwitchWithLabels.propTypes = {
  handleChange: PropTypes.func.isRequired,
  falseLabel: PropTypes.string.isRequired,
  trueLabel: PropTypes.string.isRequired,
  value: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  offColor: PropTypes.string,
  onColor: PropTypes.string
};
SwitchWithLabels.defaultProps = {
  handleChange: checked => `Implement a function to save checked input: ${checked}`,
  falseLabel: "Off",
  trueLabel: "On",
  value: false,
  offColor: '#515665',
  // dark gray
  onColor: '#05c6b4' // teal

};
export default SwitchWithLabels;