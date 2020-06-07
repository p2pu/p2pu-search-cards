import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import jsonp from 'jsonp'

import InputWrapper from '../InputWrapper'

export default class CitySelect extends Component {
  constructor(props) {
    super(props)
    this.state = { cities: [] }
    this.populateCities();
  }

  convertCityToSelectOption = (city) => {
    return {
      label: city,
      value: city.split(',')[0].toLowerCase().replace(/ /, '_')
    }
  }

  onChange = (selected) => {
    const query = selected ? selected.label : selected;

    this.props.handleChange({ [this.props.name]: query })
  }

  populateCities = () => {
    const url = 'https://learningcircles.p2pu.org/api/learningcircles/?active=true&signup=open'
    jsonp(url, null, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        this.filterCitiesFromResults(res.items);
      }
    })
  }

  filterCitiesFromResults = (courses) => {
    let cities = courses.map(course => {
      if (course.city.length > 0) {
        return this.convertCityToSelectOption(course.city)
      }
    });

    cities = cities.filter( city => city );
    const uniqBy = (arr, fn) => [...new Map(arr.reverse().map((x) => [typeof fn === 'function' ? fn(x) : x[fn], x])).values()]
    cities = uniqBy(cities, el => el.value);
    cities.sort(el => el.label);

    this.setState({ cities });
  }

  getSelected = value => {
    const { isMulti } = this.props;
    const { cities } = this.state;
    if (!value) {
      return null
    }

    if (isMulti && typeof(value === 'object')) {
      return value.map(v => cities.find(city => city.label === v))
    }

    return cities.find(city => city.label === value)
  }

  render() {
    const { label, name, value, required, errorMessage, helpText, classes, selectClasses, handleInputChange, noResultsText, placeholder, isClearable, isMulti } = this.props;
    const { cities } = this.state;
    const selected = this.getSelected(value)

    return(
      <InputWrapper
        label={label}
        name={name}
        required={required}
        errorMessage={errorMessage}
        helpText={helpText}
        classes={classes}
      >
        <Select
          name={ name }
          className={ `city-select ${selectClasses}` }
          value={ selected }
          options={ cities }
          onChange={ this.onChange }
          onInputChange={ handleInputChange }
          noResultsText={ noResultsText }
          placeholder={ placeholder }
          isClearable={ isClearable }
          isMulti={ isMulti }
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


CitySelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleInputChange: PropTypes.func,
  classes: PropTypes.string,
  noResultsText: PropTypes.string,
  placeholder: PropTypes.string,
  helpText: PropTypes.string,
  errorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
}

CitySelect.defaultProps = {
  noResultsText: "No results for this city",
  placeholder: "Start typing a city name...",
  classes: "",
  name: "select-city",
  handleChange: (selected) => console.log("Implement a function to save selection", selected),
  isClearable: true,
  isMulti: false,
  value: null,
}

