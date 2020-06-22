import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import InputWrapper from '../InputWrapper'

const URLInputWithLabel = (props) => {
  const [ browserError, setBrowserError ] = useState()
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

  const inputEl = useRef()

  const onChange = e => {
    setBrowserError(null)

    const value = e.currentTarget.value

    if (value.length >= 5 && value.substr(0,5) != 'https' && value.substr(0,5) != 'http:'){
      return handleChange({[name]: 'http://' + value});
    }

    handleChange({ [name]: value })
  }

  const checkValidity = () => {
    const validationMessage = inputEl.current.validationMessage
    setBrowserError(validationMessage)
  }

  const combinedErrorMessage = [browserError, errorMessage].filter(Boolean).join("; ")

  return (
    <InputWrapper
      label={label}
      name={name}
      id={id}
      required={required}
      disabled={disabled}
      errorMessage={combinedErrorMessage}
      helpText={helpText}
      classes={classes}
    >
      <input
        ref={inputEl}
        type={"url"}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={checkValidity}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="form-control"
        {...rest}
      />
    </InputWrapper>
  )
}

URLInputWithLabel.defaultProps = {
  type: 'text',
  value: "",
  required: false,
  disabled: false,
  label: 'Text input',
  classes: '',
  handleChange: (input) => console.log("Implement a function to save input", input)
}

URLInputWithLabel.propTypes = {
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

export default URLInputWithLabel;
