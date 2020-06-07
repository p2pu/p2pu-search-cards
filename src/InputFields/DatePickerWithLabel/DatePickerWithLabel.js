import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import InputWrapper from '../InputWrapper'

import 'react-datepicker/dist/react-datepicker.css'

const displayFormat = 'MMMM d, yyyy'

const formatDateString = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}-${month}-${day}`
}

const DatePickerWithLabel = (props) => {
  const {
    label,
    name,
    value,
    handleChange,
    required,
    disabled,
    classes,
    type,
    errorMessage,
    helpText,
    placeholder,
    labelPosition,
    minDate,
    ...rest
  } = props;

  const onChange = (value) => {
    const date = !!value ? formatDateString(value) : null;
    handleChange({ [name]: date })
  }

  const date = !!value ? Date.parse(value) : new Date();

  return(
    <InputWrapper
      label={label}
      name={name}
      required={required}
      errorMessage={errorMessage}
      helpText={helpText}
      classes={classes}
    >
      <div>
        <DatePicker
          selected={date}
          onChange={onChange}
          className="form-control"
          minDate={minDate}
          disabled={disabled}
          required={required}
          dateFormat={displayFormat}
          {...rest}
        />
      </div>
    </InputWrapper>
  )
}

DatePickerWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  value: PropTypes.string,
}

DatePickerWithLabel.defaultProps = {
  classes: "",
  label: "Time picker",
  handleChange: (input) => console.log("Implement a function to save selection", input),
  required: false,
  disabled: false,
  value: "",
}

export default DatePickerWithLabel;
