import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import InputWrapper from '../InputWrapper';
import 'react-rangeslider/lib/index.css';
import './rangeslider.css';

var RangeSliderWithLabel = function RangeSliderWithLabel(props) {
  var disabledClass = props.disabled ? 'disabled' : '';

  var label = props.label,
      name = props.name,
      id = props.id,
      handleChange = props.handleChange,
      required = props.required,
      disabled = props.disabled,
      errorMessage = props.errorMessage,
      helpText = props.helpText,
      classes = props.classes,
      value = props.value,
      min = props.min,
      max = props.max,
      step = props.step,
      rest = _objectWithoutProperties(props, ["label", "name", "id", "handleChange", "required", "disabled", "errorMessage", "helpText", "classes", "value", "min", "max", "step"]);

  var onChange = function onChange(value) {
    if (props.disabled) return null;
    handleChange(_defineProperty({}, name, value));
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
  }, /*#__PURE__*/React.createElement(Slider, _extends({
    value: value,
    name: name,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  }, rest)));
};

RangeSliderWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  classes: PropTypes.string,
  noResultsText: PropTypes.string,
  helpText: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool
};
RangeSliderWithLabel.defaultProps = {
  noResultsText: "No results for this city",
  placeholder: "Start typing a city name...",
  classes: "",
  selectClasses: "",
  handleChange: function handleChange(selected) {
    return console.log("Implement a function to save selection", selected);
  },
  isClearable: true,
  isMulti: false,
  disabled: false,
  required: false
};
export default RangeSliderWithLabel;