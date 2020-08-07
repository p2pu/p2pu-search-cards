import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputWrapper from '../InputWrapper';
import "./switch.css";

var SwitchWithLabels = function SwitchWithLabels(props) {
  var falseLabel = props.falseLabel,
      trueLabel = props.trueLabel,
      label = props.label,
      name = props.name,
      id = props.id,
      required = props.required,
      disabled = props.disabled,
      errorMessage = props.errorMessage,
      helpText = props.helpText,
      classes = props.classes,
      offColor = props.offColor,
      onColor = props.onColor,
      value = props.value,
      handleChange = props.handleChange,
      rest = _objectWithoutProperties(props, ["falseLabel", "trueLabel", "label", "name", "id", "required", "disabled", "errorMessage", "helpText", "classes", "offColor", "onColor", "value", "handleChange"]);

  var bgColor = value ? onColor : offColor;

  var onChange = function onChange(event) {
    var checked = event.currentTarget.checked;
    handleChange(_defineProperty({}, name, checked));
  };

  var onClickLabel = function onClickLabel(checked) {
    return function () {
      handleChange(_defineProperty({}, name, checked));
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
    className: "switch-background ".concat(value ? 'on' : 'off'),
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
  handleChange: function handleChange(checked) {
    return "Implement a function to save checked input: ".concat(checked);
  },
  falseLabel: "Off",
  trueLabel: "On",
  value: false,
  offColor: '#515665',
  // dark gray
  onColor: '#05c6b4' // teal

};
export default SwitchWithLabels;