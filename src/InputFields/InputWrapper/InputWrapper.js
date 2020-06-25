import React from 'react'
import PropTypes from 'prop-types'

import "./input_wrapper.css"

const InputWrapper = props => {
  const { id, name, label, labelPosition, required, disabled, errorMessage, helpText, classes, children } = props;
  const wrapperClasses = `form-group ${classes ? classes : ""} ${disabled ? "disabled" : ""} ${labelPosition ? labelPosition : ""}`

  switch (labelPosition) {
    case 'left':
      return(
        <div className={wrapperClasses} id={id}>
          <div style={{ display: 'flex', alignItems: 'baseline'}}>
            <label
              htmlFor={name}
              className='input-label left'
            >
              {label}
              {required && '*'}
            </label>
            { React.cloneElement(children, { id: name, name, required }) }
          </div>
          { helpText && <div className='form-text help-text' style={{ marginRight: 'calc(13px + 0.5rem)'}}>{ helpText }</div> }
          { errorMessage && <div className='error-message minicaps'>{ errorMessage }</div> }
        </div>
      )
    case 'right':
      return(
        <div className={wrapperClasses} id={id}>
          <div style={{ display: 'flex', alignItems: 'baseline'}}>
            { React.cloneElement(children, { id: name, name, required }) }
            <label
              htmlFor={name}
              className='input-label right'
            >
              {label}
              {required && '*'}
            </label>
          </div>
          { helpText && <div className='form-text help-text' style={{ marginLeft: 'calc(13px + 0.5rem)'}}>{ helpText }</div> }
          { errorMessage && <div className='error-message minicaps'>{ errorMessage }</div> }
        </div>
      )
    default:
      return(
        <div className={wrapperClasses} id={id}>
          <label htmlFor={name} className='input-label'>
            {label}
            {required && '*'}
          </label>
          { helpText && <div className='form-text help-text'>{ helpText }</div> }
          { React.cloneElement(children, { id: name, name, required }) }
          { errorMessage && <div className='error-message minicaps'>{ errorMessage }</div> }
        </div>
      )
  }
}

InputWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  classes: PropTypes.string,
}

export default InputWrapper;
