import _extends from "@babel/runtime/helpers/extends";
import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import InputWrapper from '../InputWrapper';

var SelectWithLabel = function SelectWithLabel(props) {
  var name = props.name,
      id = props.id,
      label = props.label,
      required = props.required,
      disabled = props.disabled,
      value = props.value,
      errorMessage = props.errorMessage,
      helpText = props.helpText,
      classes = props.classes,
      selectClasses = props.selectClasses,
      options = props.options,
      onInputChange = props.onInputChange,
      handleChange = props.handleChange,
      noResultsText = props.noResultsText,
      placeholder = props.placeholder,
      isMulti = props.isMulti,
      isClearable = props.isClearable,
      rest = _objectWithoutProperties(props, ["name", "id", "label", "required", "disabled", "value", "errorMessage", "helpText", "classes", "selectClasses", "options", "onInputChange", "handleChange", "noResultsText", "placeholder", "isMulti", "isClearable"]);

  var onChange = function onChange(selected) {
    if (!selected) {
      return handleChange(_defineProperty({}, name, null));
    }

    if (isMulti) {
      var _value = selected.map(function (s) {
        return s.value;
      });

      return handleChange(_defineProperty({}, name, _value));
    }

    return handleChange(_defineProperty({}, name, selected.value));
  };

  var getSelected = function getSelected(value) {
    if (!value) {
      return null;
    }

    if (isMulti && _typeof(value === 'object')) {
      return value.map(function (v) {
        return options.find(function (o) {
          return o.value === v;
        });
      });
    }

    return options.find(function (o) {
      return o.value === value;
    });
  };

  var selected = getSelected(value);
  return /*#__PURE__*/React.createElement(InputWrapper, {
    label: label,
    name: name,
    id: id,
    required: required,
    disabled: disabled,
    errorMessage: errorMessage,
    helpText: helpText,
    classes: classes
  }, /*#__PURE__*/React.createElement(Select, _extends({
    name: name,
    className: selectClasses,
    value: selected,
    options: options,
    onChange: onChange,
    onInputChange: onInputChange,
    noResultsText: noResultsText,
    placeholder: placeholder,
    isMulti: isMulti,
    isClearable: isClearable,
    isDisabled: disabled,
    classNamePrefix: 'react-select',
    theme: function theme(_theme) {
      return _objectSpread(_objectSpread({}, _theme), {}, {
        colors: _objectSpread(_objectSpread({}, _theme.colors), {}, {
          primary: '#05c6b4',
          primary75: '#D3D8E6',
          primary50: '#e0f7f5',
          primary25: '#F3F4F8'
        })
      });
    }
  }, rest)));
};

SelectWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func,
  classes: PropTypes.string,
  selectClasses: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  noResultsText: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  errorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool
};
SelectWithLabel.defaultProps = {
  noResultsText: "No results",
  classes: "",
  label: "Select one",
  options: [],
  handleChange: function handleChange(selected) {
    return console.log("Implement a function to save selection", selected);
  },
  isClearable: true,
  isMulti: false
};
export default SelectWithLabel;