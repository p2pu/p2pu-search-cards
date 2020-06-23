import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ApiHelper from '../utils/apiHelper';
import { t } from 'ttag';
import SelectWithLabel from '../InputFields/SelectWithLabel';
export default class TopicsFilterForm extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "fetchTopics", () => {
      const resourceType = `${this.props.searchSubject}Topics`;
      const api = new ApiHelper(resourceType);
      const params = {};

      const callback = response => {
        const topics = Object.keys(response.topics).sort();
        const options = this.mapArrayToSelectOptions(topics);
        this.setState({
          options
        });
      };

      api.fetchResource({
        params,
        callback
      });
    });

    _defineProperty(this, "handleSelect", selected => {
      this.props.updateQueryParams(selected);
    });

    _defineProperty(this, "mapArrayToSelectOptions", array => {
      return array.map(topic => ({
        value: topic,
        label: topic
      }));
    });

    this.state = {
      options: []
    };
  }

  componentDidMount() {
    this.fetchTopics();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-sm-12"
    }, /*#__PURE__*/React.createElement(SelectWithLabel, {
      name: 'topics',
      label: t`What topics are you interested in?`,
      classes: "no-flex",
      options: this.state.options,
      isMulti: true,
      value: this.props.topics,
      handleChange: this.handleSelect,
      helpText: t`Select as many topics as you want`
    }));
  }

}