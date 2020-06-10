import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import InputWrapper from '../InputWrapper'

const SelectWithLabel = (props) => {
  const {
    name,
    id,
    label,
    required,
    disabled,
    value,
    errorMessage,
    helpText,
    classes,
    selectClasses,
    options,
    onInputChange,
    handleChange,
    noResultsText,
    placeholder,
    isMulti,
    isClearable,
    ...rest
  } = props

  const onChange = selected => {
    if (!selected) { return handleChange({[name]: null }) }

    if (isMulti) {
      const value = selected.map(s => s.value)
      return handleChange({[name]: value })
    }

    return handleChange({[name]: selected.value})
  }

  const getSelected = value => {
    if (!value) {
      return null
    }

    if (isMulti && typeof(value === 'object')) {
      return value.map(v => options.find(o => o.value === v))
    }

    return options.find(o => o.value === value)
  }

  const selected = getSelected(value)

  return(
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
      <Select
        name={ name }
        className={ selectClasses }
        value={ selected }
        options={ options }
        onChange={ onChange }
        onInputChange={ onInputChange }
        noResultsText={ noResultsText }
        placeholder={ placeholder }
        isMulti={ isMulti }
        isClearable={ isClearable }
        isDisabled={ disabled }
        classNamePrefix={'react-select'}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#05c6b4',
            primary75: '#D3D8E6',
            primary50: '#e0f7f5',
            primary25: '#F3F4F8'
          },
        })}
        {...rest}
      />
    </InputWrapper>
  )
}

SelectWithLabel.propTypes = {
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
  isMulti: PropTypes.bool,
}

SelectWithLabel.defaultProps = {
  noResultsText: "No results",
  classes: "",
  label: "Select one",
  options: [],
  handleChange: (selected) => console.log("Implement a function to save selection", selected),
  isClearable: true,
  isMulti: false,
}

export default SelectWithLabel;