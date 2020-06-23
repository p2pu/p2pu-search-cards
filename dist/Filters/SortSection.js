import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import FilterButton from './FilterButton';
import FilterForm from './FilterForm';
import { COURSES_SORT_OPTIONS } from '../utils/constants';
import { t } from 'ttag';
export default class FilterSection extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "buttonLabel", filter => {
      if (filter === "orderCourses") {
        const sortBy = this.props.order || "title";
        const sortOption = COURSES_SORT_OPTIONS.find(opt => opt.value === sortBy);
        return /*#__PURE__*/React.createElement("span", null, `${sortOption["label"]}`, "\xA0\xA0\u25BE");
      }
    });

    this.state = {
      activeFilter: ''
    };

    this.updateActiveFilter = filter => this._updateActiveFilter(filter);
  }

  _updateActiveFilter(filter) {
    this.setState({
      activeFilter: filter
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "filter-section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "label"
    }, t`Sort by`), /*#__PURE__*/React.createElement("div", {
      className: "filters-bar"
    }, this.props.sortCollection.map((filter, index) => {
      const isActive = this.state.activeFilter === filter;
      const sortLabel = this.buttonLabel(filter);
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "wrapper"
      }, /*#__PURE__*/React.createElement(FilterButton, {
        filter: filter,
        active: isActive,
        updateActiveFilter: this.updateActiveFilter,
        label: sortLabel
      }), isActive && /*#__PURE__*/React.createElement(FilterForm, _extends({
        activeFilter: this.state.activeFilter,
        updateActiveFilter: this.updateActiveFilter
      }, this.props)));
    })));
  }

}