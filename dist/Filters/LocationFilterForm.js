import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _templateObject12() {
  var data = _taggedTemplateLiteral(["No results for this city"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["Start typing a city name"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["Select a location"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["or"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["Within ", " ", ""]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["km"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["miles"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["Using your current location"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["Detecting your location..."]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["Use my current location"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Geolocation is not supported by this browser."]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["Unable to detect location."]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import axios from 'axios';
import { t } from 'ttag';
import CheckboxWithLabel from '../InputFields/CheckboxWithLabel';
import RangeSliderWithLabel from '../InputFields/RangeSliderWithLabel';
import CitySelect from '../InputFields/CitySelect';

var LocationFilterForm = /*#__PURE__*/function (_Component) {
  _inherits(LocationFilterForm, _Component);

  var _super = _createSuper(LocationFilterForm);

  function LocationFilterForm(props) {
    var _this;

    _classCallCheck(this, LocationFilterForm);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getLocation", function (checkboxValue) {
      var useGeolocation = checkboxValue['geolocation'];

      _this.setState({
        gettingLocation: useGeolocation,
        useLocation: useGeolocation
      });

      if (useGeolocation === false) {
        _this.props.updateQueryParams({
          latitude: null,
          longitude: null,
          useLocation: useGeolocation
        });

        return;
      }

      var success = function success(position) {
        _this.props.updateQueryParams({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          city: null
        });

        _this.detectDistanceUnit(position.coords.latitude, position.coords.longitude);

        _this.setState({
          gettingLocation: false
        });

        _this.props.closeFilter();
      };

      var error = function error() {
        _this.setState({
          error: t(_templateObject())
        });
      };

      var options = {
        timeout: 10000,
        maximumAge: 60000
      };

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error, options);
      } else {
        _this.setState({
          error: t(_templateObject2())
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "detectDistanceUnit", function (lat, lon) {
      var countriesUsingMiles = ['US', 'GB', 'LR', 'MM'];
      var url = "http://api.geonames.org/countryCodeJSON?lat=".concat(lat, "&lng=").concat(lon, "&username=p2pu");
      axios.get(url).then(function (res) {
        var useMiles = countriesUsingMiles.indexOf(res.countryCode) >= 0;

        _this.props.updateQueryParams({
          useMiles: useMiles
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "generateLocationLabel", function () {
      var label = t(_templateObject3());

      if (_this.state.error) {
        label = _this.state.error;
      } else if (_this.state.gettingLocation) {
        label = t(_templateObject4());
      } else if (!_this.state.gettingLocation && _this.props.latitude && _this.props.longitude) {
        label = t(_templateObject5());
      }

      return label;
    });

    _defineProperty(_assertThisInitialized(_this), "handleCitySelect", function (city) {
      _this.props.updateQueryParams(_objectSpread(_objectSpread({}, city), {}, {
        latitude: null,
        longitude: null,
        distance: 50
      }));

      _this.setState({
        useLocation: false
      });

      _this.props.closeFilter();
    });

    _defineProperty(_assertThisInitialized(_this), "handleRangeChange", function (_ref) {
      var distance = _ref.distance;

      if (_this.props.useMiles) {
        return _this.props.updateQueryParams({
          distance: distance * 1.6
        });
      }

      _this.props.updateQueryParams({
        distance: distance
      });
    });

    _defineProperty(_assertThisInitialized(_this), "generateDistanceSliderLabel", function () {
      var unit = _this.props.useMiles ? t(_templateObject6()) : t(_templateObject7());

      var value = _this.generateDistanceValue();

      return t(_templateObject8(), value, unit);
    });

    _defineProperty(_assertThisInitialized(_this), "generateDistanceValue", function () {
      var value = _this.props.useMiles ? _this.props.distance * 0.62 : _this.props.distance;
      return Math.round(value / 10) * 10;
    });

    _this.state = {
      useLocation: Boolean(props.latitude) && Boolean(props.longitude)
    };
    return _this;
  }

  _createClass(LocationFilterForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props !== prevProps) {
        if (this.props.latitude === null && this.props.longitude === null) {
          this.setState({
            useLocation: false
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var distanceSliderLabel = this.generateDistanceSliderLabel();
      var distanceValue = this.generateDistanceValue();
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CheckboxWithLabel, {
        classes: "col-sm-12",
        name: "geolocation",
        label: this.generateLocationLabel(),
        value: this.state.useLocation || false,
        handleChange: this.getLocation
      }), /*#__PURE__*/React.createElement(RangeSliderWithLabel, {
        classes: "col-sm-12",
        label: distanceSliderLabel,
        name: "distance",
        value: distanceValue,
        handleChange: this.handleRangeChange,
        min: 10,
        max: 150,
        step: 10,
        disabled: !this.state.useLocation
      }), /*#__PURE__*/React.createElement("div", {
        className: "divider col-sm-12"
      }, /*#__PURE__*/React.createElement("div", {
        className: "divider-line"
      }), /*#__PURE__*/React.createElement("div", {
        className: "divider-text"
      }, t(_templateObject9()))), /*#__PURE__*/React.createElement(CitySelect, {
        label: t(_templateObject10()),
        classes: "city-select col-sm-12",
        name: "city",
        value: this.props.city,
        handleChange: this.handleCitySelect,
        placeholder: t(_templateObject11()),
        noResultsText: t(_templateObject12()),
        isMulti: false
      }));
    }
  }]);

  return LocationFilterForm;
}(Component);

export { LocationFilterForm as default };