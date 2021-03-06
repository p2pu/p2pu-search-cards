import React, { Component } from 'react'
import axios from 'axios';
import {t} from 'ttag';
import CheckboxWithLabel from '../InputFields/CheckboxWithLabel'
import RangeSliderWithLabel from '../InputFields/RangeSliderWithLabel'
import CitySelect from '../InputFields/CitySelect'

export default class LocationFilterForm extends Component {
  constructor(props) {
    super(props)
    this.state = { useLocation: (Boolean(props.latitude) && Boolean(props.longitude)) }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.latitude === null && this.props.longitude === null) {
        this.setState({ useLocation: false })
      }
    }
  }

  getLocation = (checkboxValue) => {
    const useGeolocation = checkboxValue['geolocation'];

    this.setState({ gettingLocation: useGeolocation, useLocation: useGeolocation });

    if (useGeolocation === false) {
      this.props.updateQueryParams({ latitude: null, longitude: null, useLocation: useGeolocation });
      return;
    }

    const success = (position) => {
      this.props.updateQueryParams({ latitude: position.coords.latitude, longitude: position.coords.longitude, city: null })
      this.detectDistanceUnit(position.coords.latitude, position.coords.longitude);
      this.setState({ gettingLocation: false });
      this.props.closeFilter();
    }

    const error = () => {
      this.setState({ error: t`Unable to detect location.` })
    }

    const options = {
      timeout: 10000,
      maximumAge: 60000
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
      this.setState({ error: t`Geolocation is not supported by this browser.`})
    }
  }

  detectDistanceUnit = (lat, lon) => {
    const countriesUsingMiles = ['US', 'GB', 'LR', 'MM'];
    const url = `http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lon}&username=p2pu`;

    axios.get(url)
      .then(res => {
        const useMiles = countriesUsingMiles.indexOf(res.countryCode) >= 0;
        this.props.updateQueryParams({ useMiles })
      })
  }

  generateLocationLabel = () => {
    let label = t`Use my current location`;

    if (this.state.error) {
      label = this.state.error;
    } else if (this.state.gettingLocation) {
      label = t`Detecting your location...`;
    } else if (!this.state.gettingLocation && this.props.latitude && this.props.longitude) {
      label = t`Using your current location`;
    }

    return label;
  }

  handleCitySelect = (city) => {
    this.props.updateQueryParams({ ...city, latitude: null, longitude: null, distance: 50 });
    this.setState({ useLocation: false });
    this.props.closeFilter();
  }

  handleRangeChange = ({ distance }) => {
    if (this.props.useMiles) {
      return this.props.updateQueryParams({ distance: distance * 1.6 })
    }
    this.props.updateQueryParams({ distance })
  }

  generateDistanceSliderLabel = () => {
    const unit = this.props.useMiles ? t`miles` : t`km`;
    const value = this.generateDistanceValue();
    return t`Within ${value} ${unit}`
  }

  generateDistanceValue = () => {
    const value = this.props.useMiles ? this.props.distance * 0.62 : this.props.distance;
    return Math.round(value / 10) * 10;
  }

  render() {
    const distanceSliderLabel = this.generateDistanceSliderLabel();
    const distanceValue = this.generateDistanceValue();

    return(
      <div>
        <CheckboxWithLabel
          classes='col-sm-12'
          name='geolocation'
          label={this.generateLocationLabel()}
          value={this.state.useLocation || false}
          handleChange={this.getLocation}
        />
        <RangeSliderWithLabel
          classes='col-sm-12'
          label={distanceSliderLabel}
          name='distance'
          value={distanceValue}
          handleChange={this.handleRangeChange}
          min={10}
          max={150}
          step={10}
          disabled={!this.state.useLocation}
        />
        <div className='divider col-sm-12'>
          <div className='divider-line'></div>
          <div className='divider-text'>{t`or`}</div>
        </div>
        <CitySelect
          label={t`Select a location`}
          classes='city-select col-sm-12'
          name='city'
          value={this.props.city}
          handleChange={this.handleCitySelect}
          placeholder={t`Start typing a city name`}
          noResultsText={t`No results for this city`}
          isMulti={false}
        />
      </div>
    )
  }
}
