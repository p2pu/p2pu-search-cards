import _extends from "@babel/runtime/helpers/extends";
import _typeof from "@babel/runtime/helpers/typeof";
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

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import InputWrapper from '../InputWrapper';
var LANGUAGES = [{
  label: 'English',
  value: 'en'
}, {
  label: 'German',
  value: 'de'
}, {
  label: 'Polish',
  value: 'pl'
}, {
  label: 'Romanian',
  value: 'ro'
}, {
  label: 'Finnish',
  value: 'fi'
}, {
  label: 'Portuguese',
  value: 'pt'
}];

var LanguageSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(LanguageSelect, _React$Component);

  var _super = _createSuper(LanguageSelect);

  function LanguageSelect(props) {
    var _this;

    _classCallCheck(this, LanguageSelect);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onChange", function (selected) {
      var _this$props = _this.props,
          name = _this$props.name,
          isMulti = _this$props.isMulti,
          handleChange = _this$props.handleChange;

      if (!selected) {
        return handleChange(_defineProperty({}, name, null));
      }

      if (isMulti) {
        var value = selected.map(function (s) {
          return s.value;
        });
        return handleChange(_defineProperty({}, name, value));
      }

      return handleChange(_defineProperty({}, name, selected.value));
    });

    _defineProperty(_assertThisInitialized(_this), "getSelected", function (value) {
      var isMulti = _this.props.isMulti;

      if (!value) {
        return null;
      }

      if (isMulti && _typeof(value === 'object')) {
        return value.map(function (v) {
          return LANGUAGES.find(function (o) {
            return o.value === v;
          });
        });
      }

      return LANGUAGES.find(function (o) {
        return o.value === value;
      });
    });

    return _this;
  }

  _createClass(LanguageSelect, [{
    key: "render",
    value: function render() {
      var _this$props$label = this.props.label,
          label = _this$props$label === void 0 ? 'Language' : _this$props$label;
      var props = this.props;
      var selected = this.getSelected(props.value);
      return /*#__PURE__*/React.createElement(InputWrapper, {
        label: props.label,
        name: props.name,
        id: props.id,
        required: props.required,
        disabled: props.disabled,
        errorMessage: props.errorMessage,
        helpText: props.helpText,
        classes: props.classes
      }, /*#__PURE__*/React.createElement(Select, _extends({
        name: props.name,
        className: props.selectClasses,
        value: selected,
        options: LANGUAGES,
        onChange: this.onChange,
        onInputChange: props.onInputChange,
        noResultsText: props.noResultsText,
        placeholder: props.placeholder,
        isMulti: props.isMulti,
        isClearable: props.isClearable,
        isDisabled: props.disabled,
        classNamePrefix: 'language-select',
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
      }, props.rest)));
    }
  }]);

  return LanguageSelect;
}(React.Component);

export { LanguageSelect as default };
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
  isMulti: PropTypes.bool
};
LanguageSelect.defaultProps = {
  noResultsText: "No results",
  classes: "",
  name: "select-language",
  label: "Select a language",
  handleChange: function handleChange(selected) {
    return console.log("Implement a function to save selection", selected);
  },
  isClearable: true,
  isMulti: true
};