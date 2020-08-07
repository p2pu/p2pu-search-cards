import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import PropTypes from 'prop-types';
import InputWrapper from '../InputWrapper';

var CheckboxWithLabel = function CheckboxWithLabel(props) {
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
      rest = _objectWithoutProperties(props, ["label", "name", "id", "value", "handleChange", "required", "disabled", "classes", "type", "errorMessage", "helpText", "placeholder", "labelPosition"]);

  var onChange = function onChange(e) {
    props.handleChange(_defineProperty({}, props.name, e.currentTarget.checked));
  };

  return /*#__PURE__*/React.createElement(InputWrapper, {
    label: label,
    name: name,
    id: id,
    required: required,
    disabled: disabled,
    errorMessage: errorMessage,
    helpText: helpText,
    classes: classes,
    labelPosition: labelPosition
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: value,
    disabled: disabled,
    required: required,
    onChange: onChange
  }, rest)));
};

CheckboxWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.string,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  value: PropTypes.bool,
  required: PropTypes.bool,
  errorMessage: PropTypes.string
};
CheckboxWithLabel.defaultProps = {
  classes: "",
  label: "Checkbox label",
  labelPosition: "right",
  handleChange: function handleChange(input) {
    return console.log("Implement a function to save selection", input);
  },
  value: false
};
export default CheckboxWithLabel;