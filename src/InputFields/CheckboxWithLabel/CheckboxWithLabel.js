import React from 'react'
import PropTypes from 'prop-types'
import InputWrapper from '../InputWrapper'

const CheckboxWithLabel = (props) => {
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
    labelPosition,
    ...rest
  } = props;

  const onChange = (e) => {
    props.handleChange({ [props.name]: e.currentTarget.checked })
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
      labelPosition={labelPosition}
    >
      <input
        type="checkbox"
        checked={value}
        disabled={disabled}
        required={required}
        onChange={onChange}
        {...rest}
      />
    </InputWrapper>
  )
}

CheckboxWithLabel.propTypes = {
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.string,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  value: PropTypes.bool,
  required: PropTypes.bool,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
}

CheckboxWithLabel.defaultProps = {
  classes: "",
  label: "Checkbox label",
  labelPosition: "right",
  handleChange: (input) => console.log("Implement a function to save selection", input),
  value: false
}

export default CheckboxWithLabel;