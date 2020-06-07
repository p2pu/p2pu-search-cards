import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InputWrapper from '../InputWrapper'
import "./switch.css"

const SwitchWithLabels = props => {
  const { falseLabel, trueLabel, label, name, required, disabled, errorMessage, helpText, classes, offColor, onColor, value, handleChange, ...rest } = props;
  const bgColor = value ? onColor : offColor;

  const onChange = (event) => {
    const checked = event.currentTarget.checked;
    handleChange({ [name]: checked });
  }

  const onClickLabel = (checked) => {
    return () => { handleChange({ [name]: checked }) };
  }

  return(
    <InputWrapper
      label={label}
      name={name}
      required={required}
      disabled={disabled}
      errorMessage={errorMessage}
      helpText={helpText}
      classes={classes}
    >
      <div className="switch-container">
        <span onClick={onClickLabel(false)}>{ falseLabel }</span>
        <label>
          <input
            checked={ value }
            onChange={ onChange }
            className="switch"
            type="checkbox"
            disabled={disabled}
            required={required}
            {...rest}
          />
          <div className={`switch-background ${value ? 'on' : 'off'}`} style={{ backgroundColor: bgColor }}>
            <div className="switch-button"></div>
          </div>
        </label>
        <span onClick={onClickLabel(true)}>{ trueLabel }</span>
      </div>
    </InputWrapper>
  );
}

SwitchWithLabels.propTypes = {
  handleChange: PropTypes.func.isRequired,
  falseLabel: PropTypes.string.isRequired,
  trueLabel: PropTypes.string.isRequired,
  value: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  required: PropTypes.bool,
  offColor: PropTypes.string,
  onColor: PropTypes.string,
}

SwitchWithLabels.defaultProps = {
  handleChange: (checked) => `Implement a function to save checked input: ${checked}`,
  falseLabel: "Off",
  trueLabel: "On",
  value: false,
  offColor: '#515665', // dark gray
  onColor: '#05c6b4', // teal
}

export default SwitchWithLabels