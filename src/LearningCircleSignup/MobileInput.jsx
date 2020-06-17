import React from 'react';
import ReactTelInput from 'react-telephone-input'
import 'react-telephone-input/css/default.css'

export const MobileInput = props => {
  return (
    <div className={`input-with-label form-group ${props.classes}`}>
      <label htmlFor={props.name}>{`${props.label} ${props.required ? '*' : ''}`}</label>
      <ReactTelInput
        placeholder={props.placeholder}
        flagsImagePath="https://learningcircles.p2pu.org/static/images/flags.png"
        value={props.value || props.defaultValue}
        onChange={ phone => props.handleChange({[props.name]: phone}) }
        defaultCountry="us"
      />
      {
        props.errorMessage &&
        <div className='error-message minicaps'>
          { props.errorMessage }
        </div>
      }
    </div>
  );
};

