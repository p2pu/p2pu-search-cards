import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import InputWrapper from '../InputWrapper'

const LANGUAGES = [
  {label: 'English', value: 'en'},
  {label: 'German', value: 'de'},
  {label: 'Polish', value: 'po'},
  {label: 'Romanian', value: 'ro'},
  {label: 'Finnish', value: 'fi'},
  {label: 'Portuguese', value: 'pt'},
];

export default class LanguageSelect extends React.Component {
  constructor(props){
    super(props);
  }

  onChange = selected => {
    const { name, isMulti, handleChange } = this.props

    if (!selected) { return handleChange({[name]: null }) }

    if (isMulti) {
      const value = selected.map(s => s.value)
      return handleChange({[name]: value })
    }

    return handleChange({[name]: selected.value})
  }

  getSelected = value => {
    const { isMulti } = this.props;

    if (!value) {
      return null
    }

    if (isMulti && typeof(value === 'object')) {
      return value.map(v => LANGUAGES.find(o => o.value === v))
    }

    return LANGUAGES.find(o => o.value === value)
  }

  render(){
    const {
      label = 'Language',
    } = this.props;
    const props = this.props;
    const selected = this.getSelected(props.value)

    return(
      <InputWrapper
        label={props.label}
        name={props.name}
        required={props.required}
        errorMessage={props.errorMessage}
        helpText={props.helpText}
        classes={props.classes}
      >
        <Select
          name={ props.name }
          className={ props.selectClasses }
          value={ selected }
          options={ LANGUAGES }
          onChange={ this.onChange }
          onInputChange={ props.onInputChange }
          noResultsText={ props.noResultsText }
          placeholder={ props.placeholder }
          isMulti={ props.isMulti }
          isClearable={ props.isClearable }
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
        />
      </InputWrapper>
    )
  }
}

LanguageSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func,
  classes: PropTypes.string,
  selectClasses: PropTypes.string,
  required: PropTypes.bool,
  noResultsText: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  errorMessage: PropTypes.string,
  helpText: PropTypes.string,
  id: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
}

LanguageSelect.defaultProps = {
  noResultsText: "No results",
  classes: "",
  name: "select-language",
  label: "Select a language",
  handleChange: (selected) => console.log("Implement a function to save selection", selected),
  isClearable: true,
  isMulti: true,
}
