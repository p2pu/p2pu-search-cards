import _extends from "@babel/runtime/helpers/extends";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import InputWrapper from '../InputWrapper';
const times = ["12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"];

const TimePickerWithLabel = props => {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    name,
    id,
    label,
    required,
    disabled,
    value,
    helpText,
    classes,
    selectClasses,
    handleChange,
    noResultsText,
    placeholder,
    isMulti,
    isClearable,
    ...rest
  } = props;

  const convertTo24h = input => {
    const regex = /(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])/;
    const match = input.match(regex);

    if (!match) {
      return setErrorMessage("Please enter a valid time in the format HH:MM AM/PM");
    }

    let [time, hours, minutes, m] = match;
    let hours24;
    hours = parseInt(hours);

    if (m.toUpperCase() === "PM") {
      hours24 = hours < 12 ? hours + 12 : hours;
    } else {
      hours24 = hours === 12 ? hours - 12 : hours;
    }

    const zeroPaddedHours = ('0' + hours24).slice(-2);
    return `${zeroPaddedHours}:${minutes}`;
  };

  const convertTo12h = time24h => {
    if (!time24h) return "";
    let [hours, minutes] = time24h.split(':');
    hours = parseInt(hours);
    let hours12 = hours;
    let m = "AM";

    if (hours >= 12) {
      m = "PM";
      hours12 = hours === 12 ? hours : hours - 12;
    } else {
      hours12 = hours === 0 ? hours + 12 : hours;
    }

    return `${hours12}:${minutes} ${m}`;
  };

  const onChange = selected => {
    if (!selected) {
      return handleChange({
        [name]: null
      });
    }

    if (isMulti) {
      const value = selected.map(s => convertTo24h(s.label));
      return handleChange({
        [name]: value
      });
    }

    return handleChange({
      [name]: convertTo24h(selected.label)
    });
  };

  const onInputChange = () => {
    setErrorMessage(null);
  };

  const getSelected = value => {
    if (!value) {
      return null;
    }

    const label = convertTo12h(value);

    if (isMulti && typeof (value === 'object')) {
      return value.map(v => options.find(o => o.label === convertTo12h(v)));
    }

    return options.find(o => o.label === label);
  };

  const options = times.map(t => {
    return {
      label: t,
      value: t
    };
  });
  const formattedSelection = convertTo12h(value);
  const selected = {
    label: formattedSelection,
    value: formattedSelection
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
    theme: theme => ({ ...theme,
      colors: { ...theme.colors,
        primary: '#05c6b4',
        primary75: '#D3D8E6',
        primary50: '#e0f7f5',
        primary25: '#F3F4F8'
      }
    })
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
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool
};
TimePickerWithLabel.defaultProps = {
  classes: "",
  label: "Time picker",
  handleChange: input => console.log("Implement a function to save selection", input),
  required: false,
  disabled: false,
  errorMessage: null,
  value: "",
  options: [],
  isClearable: true,
  isMulti: false,
  placeholder: "HH:MM AM/PM"
};
export default TimePickerWithLabel;