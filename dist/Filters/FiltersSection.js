import _extends from "@babel/runtime/helpers/extends";
import React, { Component } from 'react';
import { t } from 'ttag';
import FilterButton from './FilterButton';
import FilterForm from './FilterForm';
export default class FilterSection extends Component {
  constructor(props) {
    super(props);
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
    }, t`Filter`), /*#__PURE__*/React.createElement("div", {
      className: "filters-bar"
    }, this.props.filterCollection.map((filter, index) => {
      const isActive = this.state.activeFilter === filter;
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: "wrapper"
      }, /*#__PURE__*/React.createElement(FilterButton, {
        filter: filter,
        active: isActive,
        updateActiveFilter: this.updateActiveFilter
      }), isActive && /*#__PURE__*/React.createElement(FilterForm, _extends({
        activeFilter: this.state.activeFilter,
        updateActiveFilter: this.updateActiveFilter
      }, this.props)));
    })));
  }

}