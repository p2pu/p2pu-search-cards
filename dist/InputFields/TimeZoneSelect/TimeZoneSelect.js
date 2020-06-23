import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Select from 'react-select';
import timezones from './timezone-names.js';
import InputWrapper from '../InputWrapper';
const GEONAMES_ENDPOINT = 'https://secure.geonames.org/timezoneJSON';
export default class TimeZoneSelect extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", selected => {
      const timezone = !!selected ? selected.value : null;
      this.props.handleChange({
        [this.props.name]: timezone
      });
    });

    _defineProperty(this, "detectTimeZone", () => {
      if (!this.props.value) {
        if (!!this.props.latitude && !!this.props.longitude) {
          // use selected city to detect timezone
          const url = `${GEONAMES_ENDPOINT}?lat=${this.props.latitude}&lng=${this.props.longitude}&username=p2pu`;
          axios.get(url).then(res => {
            const timezone = res.data.timezoneId;
            this.props.handleChange({
              [this.props.name]: timezone
            });
          }).catch(err => console.log(err));
        } else {
          // detect timezone from browser
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          this.props.handleChange({
            [this.props.name]: timezone
          });
        }
      }
    });
  }

  componentDidMount() {
    this.detectTimeZone();
  }

  render() {
    const {
      label,
      name,
      id,
      value,
      required,
      disabled,
      errorMessage,
      helpText,
      classes,
      selectClasses,
      isClearable,
      isMulti,
      ...rest
    } = this.props;
    const timezoneOptions = timezones.map(tz => ({
      value: tz,
      label: tz
    }));
    const selected = timezoneOptions.find(opt => opt.value === value) || null;
    return /*#__PURE__*/React.createElement(InputWrapper, {
      label: label,
      name: name,
      id: id,
      required: required,
      disabled: disabled,
      errorMessage: errorMessage,
      helpText: helpText,
      classes: classes
    }, /*#__PURE__*/React.createElement(Select, _extends({
      name: name,
      id: name,
      className: `form-group input-with-label ${selectClasses}`,
      value: selected,
      onChange: this.onChange,
      options: timezoneOptions,
      isClearable: isClearable,
      isMulti: isMulti,
      isDisabled: disabled,
      classNamePrefix: 'timezone-select',
      theme: theme => ({ ...theme,
        colors: { ...theme.colors,
          primary: '#05c6b4',
          primary75: '#D3D8E6',
          primary50: '#e0f7f5',
          primary25: '#F3F4F8'
        }
      })
    }, rest)));
  }

}
TimeZoneSelect.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
  selectClasses: PropTypes.string,
  timezone: PropTypes.string,
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  errorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool
};
TimeZoneSelect.defaultProps = {
  classes: "",
  selectClasses: "",
  handleChange: selected => console.log("Implement a function to save selection", selected),
  isClearable: true,
  isMulti: false
};