import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["Select as many languages as you want"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["What languages are you interested in?"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { t } from 'ttag';
import ApiHelper from '../utils/apiHelper';
import SelectWithLabel from '../InputFields/SelectWithLabel';

var LanguageFilterForm = /*#__PURE__*/function (_Component) {
  _inherits(LanguageFilterForm, _Component);

  var _super = _createSuper(LanguageFilterForm);

  function LanguageFilterForm(props) {
    var _this;

    _classCallCheck(this, LanguageFilterForm);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "fetchLanguages", function () {
      var resourceType = "coursesLanguages";
      var api = new ApiHelper(resourceType);
      var params = {};

      var callback = function callback(response) {
        var options = _this.mapArrayToSelectOptions(response.languages);

        _this.setState({
          options: options
        });
      };

      api.fetchResource({
        params: params,
        callback: callback
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (selected) {
      _this.props.updateQueryParams(selected);
    });

    _defineProperty(_assertThisInitialized(_this), "mapArrayToSelectOptions", function (array) {
      return array.map(function (item) {
        return {
          value: item.code,
          label: item.name_local
        };
      });
    });

    _this.state = {
      options: []
    };
    return _this;
  }

  _createClass(LanguageFilterForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchLanguages();
    }
  }, {
    key: "render",
    value: function render() {
      console.log('this.props.languages', this.props.languages);
      return /*#__PURE__*/React.createElement("div", {
        className: "col-sm-12"
      }, /*#__PURE__*/React.createElement(SelectWithLabel, {
        name: 'languages',
        label: t(_templateObject()),
        classes: "no-flex",
        options: this.state.options,
        isMulti: true,
        value: this.props.languages,
        handleChange: this.handleSelect,
        helpText: t(_templateObject2())
      }));
    }
  }]);

  return LanguageFilterForm;
}(Component);

export { LanguageFilterForm as default };