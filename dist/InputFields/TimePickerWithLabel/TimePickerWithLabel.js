import _extends from "@babel/runtime/helpers/extends";
import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import InputWrapper from '../InputWrapper';
var times = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];

var TimePickerWithLabel = function TimePickerWithLabel(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      errorMessage = _useState2[0],
      setErrorMessage = _useState2[1];

  var name = props.name,
      id = props.id,
      label = props.label,
      required = props.required,
      disabled = props.disabled,
      value = props.value,
      helpText = props.helpText,
      classes = props.classes,
      selectClasses = props.selectClasses,
      handleChange = props.handleChange,
      noResultsText = props.noResultsText,
      placeholder = props.placeholder,
      isMulti = props.isMulti,
      isClearable = props.isClearable,
      rest = _objectWithoutProperties(props, ["name", "id", "label", "required", "disabled", "value", "helpText", "classes", "selectClasses", "handleChange", "noResultsText", "placeholder", "isMulti", "isClearable"]);

  var convertTo24h = function convertTo24h(input) {
    var regex = /(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])/;
    var match = input.match(regex);

    if (!match) {
      return setErrorMessage("Please enter a valid time in the format HH:MM AM/PM");
    }

    var _match = _slicedToArray(match, 4),
        time = _match[0],
        hours = _match[1],
        minutes = _match[2],
        m = _match[3];

    var hours24;
    hours = parseInt(hours);

    if (m.toUpperCase() === "PM") {
      hours24 = hours < 12 ? hours + 12 : hours;
    } else {
      hours24 = hours === 12 ? hours - 12 : hours;
    }

    var zeroPaddedHours = ('0' + hours24).slice(-2);
    return "".concat(zeroPaddedHours, ":").concat(minutes);
  };

  var convertTo12h = function convertTo12h(time24h) {
    if (!time24h) return null;

    var _time24h$split = time24h.split(':'),
        _time24h$split2 = _slicedToArray(_time24h$split, 2),
        hours = _time24h$split2[0],
        minutes = _time24h$split2[1];

    hours = parseInt(hours);
    var hours12 = hours;
    var m = "AM";

    if (hours >= 12) {
      m = "PM";
      hours12 = hours === 12 ? hours : hours - 12;
    } else {
      hours12 = hours === 0 ? hours + 12 : hours;
    }

    return "".concat(hours12, ":").concat(minutes, " ").concat(m);
  };

  var onChange = function onChange(selected) {
    if (!selected) {
      return handleChange(_defineProperty({}, name, null));
    }

    if (isMulti) {
      var _value = selected.map(function (s) {
        return convertTo24h(s.label);
      });

      return handleChange(_defineProperty({}, name, _value));
    }

    return handleChange(_defineProperty({}, name, convertTo24h(selected.label)));
  };

  var onInputChange = function onInputChange() {
    setErrorMessage(null);
  };

  var getSelected = function getSelected(value) {
    if (!value) {
      return null;
    }

    var label = convertTo12h(value);

    if (isMulti && _typeof(value === 'object')) {
      return value.map(function (v) {
        return options.find(function (o) {
          return o.label === convertTo12h(v);
        });
      });
    }

    return options.find(function (o) {
      return o.label === label;
    });
  };

  var options = times.map(function (t) {
    return {
      label: t,
      value: t
    };
  });
  var formattedSelection = convertTo12h(value);
  var selected = formattedSelection ? {
    label: formattedSelection,
    value: formattedSelection
  } : formattedSelection;
  return /*#__PURE__*/React.createElement(InputWrapper, {
    label: label,
    name: name,
    id: id,
    required: required,
    disabled: disabled,
    errorMessage: errorMessage,
    helpText: helpText,
    classes: classes
  }, /*#__PURE__*/React.createElement(CreatableSelect, _extends({
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

TimePickerWithLabel.propTypes = {
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
  helpText: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool
};
TimePickerWithLabel.defaultProps = {
  classes: "",
  label: "Time picker",
  handleChange: function handleChange(input) {
    return console.log("Implement a function to save selection", input);
  },
  required: false,
  disabled: false,
  errorMessage: null,
  value: "",
  isClearable: true,
  isMulti: false,
  placeholder: "HH:MM AM/PM",
  helpText: 'Select a time or type it in.'
};
export default TimePickerWithLabel;