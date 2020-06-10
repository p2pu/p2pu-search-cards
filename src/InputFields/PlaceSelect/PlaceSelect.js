import React, { Component } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import InputWrapper from '../InputWrapper'

const ALGOLIA_ENDPOINT = 'https://places-dsn.algolia.net/1/places'

const KANSAS_CITY_OPTION = {
  label: 'Kansas City, Missouri, United States of America',
  value: {
    administrative: ['Missouri'],
    country: {
      default: 'United States of America'
    },
    locale_names: {
      default: ['Kansas City']
    },
    // from https://tools.wmflabs.org
    _geoloc: {
      lat: 39.099722,
      lng: -94.578333
    }
  }
};

const CustomOption = ({ innerProps, isDisabled }) =>
  !isDisabled ? (
    <div {...innerProps}>{/* your component internals */}</div>
  ) : null;

export default class PlaceSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { hits: [], selected: null };
  }

  componentDidMount() {
    if (this.props.value) {
      const { value, name, handleChange } =  this.props

      if (!!value.objectID) {
        this.fetchPlaceById(value.objectID);
      } else if (value.city === 'Kansas City, Missouri, United States of America') {
        this.handleSelect(KANSAS_CITY_OPTION)
      } else {
        handleChange({ [name]: null })
      }
    }
  }

  handleSelect = (selected) => {
    const value = selected ? selected.value : null
    this.props.handleChange({ [this.props.name]: value })
    this.setState({ selected })
  }

  searchPlaces = (query) => {
    const url = `${ALGOLIA_ENDPOINT}/query/`;
    const data = {
      "type": "city",
      "hitsPerPage": "10",
      "query": query
    };
    const method = 'post';

    return axios({
      data,
      url,
      method
    }).then(res => {
      let options = res.data.hits.map(place => this.generateCityOption(place));
      // Kansas City, MO is missing from the Algolia places API
      // so we're manually adding it in
      // TODO: don't do this
      if (query.toLowerCase().includes('kansas')) {
        options.unshift(KANSAS_CITY_OPTION)
      }
      return options
    }).catch(err => {
      console.log(err)
    })
  }

  fetchPlaceById = (placeId) => {
    const url = `${ALGOLIA_ENDPOINT}/${placeId}`;

    axios.get(url)
      .then(res => {
        const value = this.generateCityOption(res.data)
        this.handleSelect(value)
      })
      .catch(err => {
        console.log(err)
      })
  }

  generateCityOption = (place) => {
    return {
      label: `${place.locale_names.default[0]}, ${place.administrative[0]}, ${place.country.default}`,
      value: place
    }
  }

  render() {
    const { label, name, id, value, required, disabled, errorMessage, helpText, classes, selectClasses, handleInputChange, noResultsText, placeholder, isClearable, isMulti, ...rest } = this.props
    const { selected } = this.state;

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
        <AsyncSelect
          name={ name }
          className={ `city-select ${selectClasses}` }
          value={ selected }
          onChange={ this.handleSelect }
          onInputChange={ handleInputChange }
          noResultsText={ noResultsText }
          placeholder={ placeholder }
          loadOptions={ this.searchPlaces }
          isClearable={ isClearable }
          isMulti={ isMulti }
          isDisabled={ disabled }
          classNamePrefix={'place-select'}
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
}

PlaceSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  noResultsText: PropTypes.string,
  placeholder: PropTypes.string,
  place_id: PropTypes.string,
  city: PropTypes.string,
  errorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
}

PlaceSelect.defaultProps = {
  noResultsText: "No results for this city",
  placeholder: "Start typing a city name...",
  classes: "",
  selectClasses: "",
  name: "select-place",
  handleChange: (selected) => console.log("Implement a function to save selection", selected),
  isClearable: true,
  isMulti: false,
}

