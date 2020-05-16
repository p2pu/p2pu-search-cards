import React, { Component } from 'react'
import ApiHelper from '../utils/apiHelper'
import { t } from 'ttag'
import { SelectWithLabel } from 'p2pu-input-fields'

export default class TopicsFilterForm extends Component {
  constructor(props) {
    super(props)
    this.state = { options: [] };
    this.mapArrayToSelectOptions = (arr) => this._mapArrayToSelectOptions(arr);
    this.extractTopicsArray = (opts) => this._extractTopicsArray(opts);
    this.handleSelect = (selected) => this._handleSelect(selected);
    this.fetchTopics = () => this._fetchTopics();
  }

  componentDidMount() {
    this.fetchTopics();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const topics = nextProps.topics ? nextProps.topics.map((topic) => ({ value: topic, label: topic })) : [];
      this.setState({ topics: topics })
    }
  }

  _fetchTopics() {
    const resourceType = `${this.props.searchSubject}Topics`;
    const api = new ApiHelper(resourceType);
    const params = {};
    const callback = (response) => {
      const topics = Object.keys(response.topics).sort()
      const options = this.mapArrayToSelectOptions(topics);
      this.setState({ options })
    }

    api.fetchResource({ params, callback })
  }

  _handleSelect(selected) {
    const newTopicList = this.extractTopicsArray(selected);
    this.props.updateQueryParams({ topics: newTopicList })
  }

  _mapArrayToSelectOptions(array) {
    return array.map((topic) => ({ value: topic, label: topic }))
  }

  _extractTopicsArray(options) {
    if (!options) {
      return null
    }
    return options.map(option => option.value)
  }

  render() {
    const value = this.mapArrayToSelectOptions(this.props.topics || []);

    return(
      <div className="col-sm-12">
        <SelectWithLabel
          label={t`What topics are you interested in?`}
          classes='no-flex'
          options={this.state.options}
          isMulti={true}
          value={value}
          handleChange={this.handleSelect}
          placeholder={t`Select as many topics as you want`}
        />
      </div>
    )
  }
}
