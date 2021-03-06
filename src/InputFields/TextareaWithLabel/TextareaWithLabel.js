import React from 'react'
import PropTypes from 'prop-types'
import InputWrapper from '../InputWrapper'

const TextareaWithLabel = (props) => {
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
    placeholder,
    ...rest
  } = props;
  const onChange = e => {
    props.handleChange({ [props.name]: e.currentTarget.value })
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
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="form-control"
        {...rest}
      />
    </InputWrapper>
  )
}

TextareaWithLabel.defaultProps = {
  type: 'text',
  value: "",
  required: false,
  disabled: false,
  label: 'Textarea input',
  classes: '',
  handleChange: (input) => console.log("Implement a function to save input", input)
}

TextareaWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  classes: PropTypes.string,
}

export default TextareaWithLabel;
