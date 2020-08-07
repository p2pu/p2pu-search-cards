import _extends from "@babel/runtime/helpers/extends";
import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _templateObject() {
  var data = _taggedTemplateLiteral(["Sort by"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import FilterButton from './FilterButton';
import FilterForm from './FilterForm';
import { COURSES_SORT_OPTIONS } from '../utils/constants';
import { t } from 'ttag';

var FilterSection = /*#__PURE__*/function (_Component) {
  _inherits(FilterSection, _Component);

  var _super = _createSuper(FilterSection);

  function FilterSection(props) {
    var _this;

    _classCallCheck(this, FilterSection);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "buttonLabel", function (filter) {
      if (filter === "orderCourses") {
        var sortBy = _this.props.order || "title";
        var sortOption = COURSES_SORT_OPTIONS.find(function (opt) {
          return opt.value === sortBy;
        });
        return /*#__PURE__*/React.createElement("span", null, "".concat(sortOption["label"]), "\xA0\xA0\u25BE");
      }
    });

    _this.state = {
      activeFilter: ''
    };

    _this.updateActiveFilter = function (filter) {
      return _this._updateActiveFilter(filter);
    };

    return _this;
  }

  _createClass(FilterSection, [{
    key: "_updateActiveFilter",
    value: function _updateActiveFilter(filter) {
      this.setState({
        activeFilter: filter
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React.createElement("div", {
        className: "filter-section"
      }, /*#__PURE__*/React.createElement("div", {
        className: "label"
      }, t(_templateObject())), /*#__PURE__*/React.createElement("div", {
        className: "filters-bar"
      }, this.props.sortCollection.map(function (filter, index) {
        var isActive = _this2.state.activeFilter === filter;

        var sortLabel = _this2.buttonLabel(filter);

        return /*#__PURE__*/React.createElement("div", {
          key: index,
          className: "wrapper"
        }, /*#__PURE__*/React.createElement(FilterButton, {
          filter: filter,
          active: isActive,
          updateActiveFilter: _this2.updateActiveFilter,
          label: sortLabel
        }), isActive && /*#__PURE__*/React.createElement(FilterForm, _extends({
          activeFilter: _this2.state.activeFilter,
          updateActiveFilter: _this2.updateActiveFilter
        }, _this2.props)));
      })));
    }
  }]);

  return FilterSection;
}(Component);

export { FilterSection as default };