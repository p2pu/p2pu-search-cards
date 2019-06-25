import React, { Component } from 'react'
import { CheckboxWithLabel, RangeSliderWithLabel, CitySelect } from 'p2pu-input-fields';
import axios from 'axios';
import {t} from 'ttag';

export default class LocationFilterForm extends Component {
  constructor(props) {
    super(props)
    this.state = { useLocation: false }
    this.getLocation = (checkboxValue) => this._getLocation(checkboxValue);
    this.handleCitySelect = (city) => this._handleCitySelect(city);
    this.handleRangeChange = (value) => this._handleRangeChange(value);
    this.generateLocationLabel = () => this._generateLocationLabel();
    this.detectDistanceUnit = (lat, lon) => this._detectDistanceUnit(lat, lon);
    this.generateDistanceValue = () => this._generateDistanceValue();
    this.generateDistanceSliderLabel = () => this._generateDistanceSliderLabel();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.latitude === null && nextProps.longitude === null) {
        this.setState({ useLocation: false })
      }
    }
  }

  _getLocation(checkboxValue) {
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

  _detectDistanceUnit(lat, lon) {
    const countriesUsingMiles = ['US', 'GB', 'LR', 'MM'];
    const url = `http://ws.geonames.org/countryCodeJSON?lat=${lat}&lng=${lon}&username=p2pu`;

    axios.get(url)
      .then(res => {
        const useMiles = countriesUsingMiles.indexOf(res.countryCode) >= 0;
        this.props.updateQueryParams({ useMiles })
      })
  }

  _generateLocationLabel() {
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

  _handleCitySelect(city) {
    this.props.updateQueryParams({ city, latitude: null, longitude: null, distance: 50 });
    this.setState({ useLocation: false });
    this.props.closeFilter();
  }

  _handleRangeChange(value) {
    let distance = value;
    if (this.props.useMiles) {
      distance = value * 1.6
    }
    this.props.updateQueryParams({ distance })
  }

  _generateDistanceSliderLabel() {
    const unit = this.props.useMiles ? t`miles` : t`km`;
    const value = this.generateDistanceValue();
    return t`Within ${value} ${unit}`
  }

  _generateDistanceValue() {
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
          checked={this.state.useLocation}
          handleChange={this.getLocation}
        />
        <RangeSliderWithLabel
          classes='col-sm-12'
          label={distanceSliderLabel}
          name='distance-slider'
          value={distanceValue}
          handleChange={this.handleRangeChange}
          min={10}
          max={150}
          step={10}
          disabled={!this.state.useLocation}
        />
        <div className='divider col-sm-12'>
          <div className='divider-line'></div>
          <div className='divider-text'>or</div>
        </div>
        <div className='select-with-label label-left col-sm-12' >
          <label htmlFor='select-city'>{t`Select a location`}:</label>
          <CitySelect
            classes=''
            name='select-city'
            label={t`Select a location`}
            value={this.props.city}
            handleSelect={this.handleCitySelect}
          />
        </div>
      </div>
    )
  }
}
