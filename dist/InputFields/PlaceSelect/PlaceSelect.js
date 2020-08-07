import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import InputWrapper from '../InputWrapper';
var ALGOLIA_ENDPOINT = 'https://places-dsn.algolia.net/1/places';
var KANSAS_CITY_OPTION = {
  label: 'Kansas City, Missouri, United States of America',
  value: {
    administrative: ['Missouri'],
    country: {
      "default": 'United States of America'
    },
    locale_names: {
      "default": ['Kansas City']
    },
    // from https://tools.wmflabs.org
    _geoloc: {
      lat: 39.099722,
      lng: -94.578333
    }
  }
};

var CustomOption = function CustomOption(_ref) {
  var innerProps = _ref.innerProps,
      isDisabled = _ref.isDisabled;
  return !isDisabled ? /*#__PURE__*/React.createElement("div", innerProps) : null;
};

var PlaceSelect = /*#__PURE__*/function (_Component) {
  _inherits(PlaceSelect, _Component);

  var _super = _createSuper(PlaceSelect);

  function PlaceSelect(props) {
    var _this;

    _classCallCheck(this, PlaceSelect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (selected) {
      var value = selected ? selected.value : null;

      _this.props.handleChange(_defineProperty({}, _this.props.name, value));

      _this.setState({
        selected: selected
      });
    });

    _defineProperty(_assertThisInitialized(_this), "searchPlaces", function (query) {
      var url = "".concat(ALGOLIA_ENDPOINT, "/query/");
      var data = {
        "type": "city",
        "hitsPerPage": "10",
        "query": query
      };
      var method = 'post';
      return axios({
        data: data,
        url: url,
        method: method
      }).then(function (res) {
        var options = res.data.hits.map(function (place) {
          return _this.generateCityOption(place);
        }); // Kansas City, MO is missing from the Algolia places API
        // so we're manually adding it in
        // TODO: don't do this

        if (query.toLowerCase().includes('kansas')) {
          options.unshift(KANSAS_CITY_OPTION);
        }

        return options;
      })["catch"](function (err) {
        console.log(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "fetchPlaceById", function (placeId) {
      var url = "".concat(ALGOLIA_ENDPOINT, "/").concat(placeId);
      axios.get(url).then(function (res) {
        var value = _this.generateCityOption(res.data);

        _this.handleSelect(value);
      })["catch"](function (err) {
        console.log(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "generateCityOption", function (place) {
      return {
        label: "".concat(place.locale_names["default"][0], ", ").concat(place.administrative[0], ", ").concat(place.country["default"]),
        value: place
      };
    });

    _this.state = {
      hits: [],
      selected: null
    };
    return _this;
  }

  _createClass(PlaceSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.value) {
        var _this$props = this.props,
            value = _this$props.value,
            name = _this$props.name,
            handleChange = _this$props.handleChange;

        if (!!value.objectID) {
          this.fetchPlaceById(value.objectID);
        } else if (value.city === 'Kansas City, Missouri, United States of America') {
          this.handleSelect(KANSAS_CITY_OPTION);
        } else {
          handleChange(_defineProperty({}, name, null));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          label = _this$props2.label,
          name = _this$props2.name,
          id = _this$props2.id,
          value = _this$props2.value,
          required = _this$props2.required,
          disabled = _this$props2.disabled,
          errorMessage = _this$props2.errorMessage,
          helpText = _this$props2.helpText,
          classes = _this$props2.classes,
          selectClasses = _this$props2.selectClasses,
          handleInputChange = _this$props2.handleInputChange,
          noResultsText = _this$props2.noResultsText,
          placeholder = _this$props2.placeholder,
          isClearable = _this$props2.isClearable,
          isMulti = _this$props2.isMulti,
          rest = _objectWithoutProperties(_this$props2, ["label", "name", "id", "value", "required", "disabled", "errorMessage", "helpText", "classes", "selectClasses", "handleInputChange", "noResultsText", "placeholder", "isClearable", "isMulti"]);

      var selected = this.state.selected;
      return /*#__PURE__*/React.createElement(InputWrapper, {
        label: label,
        name: name,
        id: id,
        required: required,
        disabled: disabled,
        errorMessage: errorMessage,
        helpText: helpText,
        classes: classes
      }, /*#__PURE__*/React.createElement(AsyncSelect, _extends({
        name: name,
        className: "city-select ".concat(selectClasses),
        value: selected,
        onChange: this.handleSelect,
        onInputChange: handleInputChange,
        noResultsText: noResultsText,
        placeholder: placeholder,
        loadOptions: this.searchPlaces,
        isClearable: isClearable,
        isMulti: isMulti,
        isDisabled: disabled,
        classNamePrefix: 'place-select',
        theme: function theme(_theme) {
          return _objectSpread(_objectSpread({}, _theme), {}, {
            colors: _objectSpread(_objectSpread({}, _theme.colors), {}, {
              primary: '#05c6b4',
              primary75: '#D3D8E6',
              primary50: '#e0f7f5',
              primary25: '#F3F4F8'
            })
          });
        }
      }, rest)));
    }
  }]);

  return PlaceSelect;
}(Component);

export { PlaceSelect as default };
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
  isMulti: PropTypes.bool
};
PlaceSelect.defaultProps = {
  noResultsText: "No results for this city",
  placeholder: "Start typing a city name...",
  classes: "",
  selectClasses: "",
  name: "select-place",
  handleChange: function handleChange(selected) {
    return console.log("Implement a function to save selection", selected);
  },
  isClearable: true,
  isMulti: false
};