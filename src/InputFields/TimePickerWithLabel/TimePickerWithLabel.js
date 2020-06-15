import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import InputWrapper from '../InputWrapper'

import 'react-datepicker/dist/react-datepicker.css';

const saveFormat = 'HH:mm';
const displayFormat = 'h:mm a';

const formatTimeString = date => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
}

const generateDateTime = value => {
  const [hours, minutes] = value.split(':')
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}

const TimePickerWithLabel = (props) => {
  const {
    name,
    id,
    label,
    value,
    handleChange,
    required,
    disabled,
    errorMessage,
    helpText,
    classes,
    ...rest
  } = props;

  const onChange = (value) => {
    const time = !!value ? formatTimeString(value) : null;
    handleChange({ [name]: time })
  }

  const time = !!value ? generateDateTime(value) : new Date();

  return(
    <InputWrapper
      label={label}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      classes={classes}
    >
      <div>
        <DatePicker
          selected={time}
          onChange={onChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat={displayFormat}
          name={name}
          id={name}
          className="form-control"
          {...rest}
        />
      </div>
    </InputWrapper>
  )
}

TimePickerWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  value: PropTypes.string,
}

TimePickerWithLabel.defaultProps = {
  classes: "",
  label: "Time picker",
  handleChange: (input) => console.log("Implement a function to save selection", input),
  required: false,
  disabled: false,
  errorMessage: null,
  value: "",
}

export default TimePickerWithLabel;
