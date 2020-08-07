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
import Select from 'react-select';
import timezones from './timezone-names.js';
import InputWrapper from '../InputWrapper';
var GEONAMES_ENDPOINT = 'https://secure.geonames.org/timezoneJSON';

var TimeZoneSelect = /*#__PURE__*/function (_Component) {
  _inherits(TimeZoneSelect, _Component);

  var _super = _createSuper(TimeZoneSelect);

  function TimeZoneSelect(props) {
    var _this;

    _classCallCheck(this, TimeZoneSelect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onChange", function (selected) {
      var timezone = !!selected ? selected.value : null;

      _this.props.handleChange(_defineProperty({}, _this.props.name, timezone));
    });

    _defineProperty(_assertThisInitialized(_this), "detectTimeZone", function () {
      if (!_this.props.value) {
        if (!!_this.props.latitude && !!_this.props.longitude) {
          // use selected city to detect timezone
          var url = "".concat(GEONAMES_ENDPOINT, "?lat=").concat(_this.props.latitude, "&lng=").concat(_this.props.longitude, "&username=p2pu");
          axios.get(url).then(function (res) {
            var timezone = res.data.timezoneId;

            _this.props.handleChange(_defineProperty({}, _this.props.name, timezone));
          })["catch"](function (err) {
            return console.log(err);
          });
        } else {
          // detect timezone from browser
          var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

          _this.props.handleChange(_defineProperty({}, _this.props.name, timezone));
        }
      }
    });

    return _this;
  }

  _createClass(TimeZoneSelect, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.detectTimeZone();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          name = _this$props.name,
          id = _this$props.id,
          value = _this$props.value,
          required = _this$props.required,
          disabled = _this$props.disabled,
          errorMessage = _this$props.errorMessage,
          helpText = _this$props.helpText,
          classes = _this$props.classes,
          selectClasses = _this$props.selectClasses,
          isClearable = _this$props.isClearable,
          isMulti = _this$props.isMulti,
          rest = _objectWithoutProperties(_this$props, ["label", "name", "id", "value", "required", "disabled", "errorMessage", "helpText", "classes", "selectClasses", "isClearable", "isMulti"]);

      var timezoneOptions = timezones.map(function (tz) {
        return {
          value: tz,
          label: tz
        };
      });
      var selected = timezoneOptions.find(function (opt) {
        return opt.value === value;
      }) || null;
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
        className: "form-group input-with-label ".concat(selectClasses),
        value: selected,
        onChange: this.onChange,
        options: timezoneOptions,
        isClearable: isClearable,
        isMulti: isMulti,
        isDisabled: disabled,
        classNamePrefix: 'timezone-select',
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

  return TimeZoneSelect;
}(Component);

export { TimeZoneSelect as default };
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
  handleChange: function handleChange(selected) {
    return console.log("Implement a function to save selection", selected);
  },
  isClearable: true,
  isMulti: false
};