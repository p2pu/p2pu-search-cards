import React from 'react'
import PropTypes from 'prop-types'
import InputWrapper from '../InputWrapper'

const InputWithLabel = (props) => {
  const {
    label,
    name,
    id,
    value,
    handleChange,
    required,
    disabled,
    classes,
    type,
    errorMessage,
    helpText,
    placeholder,
    ...rest
  } = props;

  const onChange = e => {
    handleChange({ [name]: e.currentTarget.value })
  }

  return (
    <InputWrapper
      label={label}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      helpText={helpText}
      classes={classes}
    >
      <input
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="form-control"
        {...rest}
      />
    </InputWrapper>
  )
}

InputWithLabel.defaultProps = {
  type: 'text',
  value: "",
  required: false,
  disabled: false,
  label: 'Text input',
  classes: '',
  handleChange: (input) => console.log("Implement a function to save input", input)
}

InputWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  classes: PropTypes.string,
  placeholder: PropTypes.string,
}

export default InputWithLabel;
