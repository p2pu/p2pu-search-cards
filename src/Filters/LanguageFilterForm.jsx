import React, { Component } from 'react'
import { t } from 'ttag';
import ApiHelper from '../utils/apiHelper'

import { SelectWithLabel } from 'p2pu-input-fields'

export default class LanguageFilterForm extends Component {
  constructor(props) {
    super(props)
    this.state = { options: [] };
    this.mapArrayToSelectOptions = (arr) => this._mapArrayToSelectOptions(arr);
    this.extractLanguagesArray = (opts) => this._extractLanguagesArray(opts);
    this.handleSelect = (selected) => this._handleSelect(selected);
    this.fetchLanguages = () => this._fetchLanguages();
  }

  componentDidMount() {
    this.fetchLanguages();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const languages = nextProps.languages || [];
      this.setState({ languages: languages })
    }
  }

  _fetchLanguages() {
    const resourceType = `coursesLanguages`;
    const api = new ApiHelper(resourceType);
    const params = {};
    const callback = (response) => {
      const options = this.mapArrayToSelectOptions(response.languages);
      this.setState({ options })
    }

    api.fetchResource({ params, callback })
  }

  _handleSelect(selected) {
    this.setState({ selected });
    const newLanguagesList = this.extractLanguagesArray(selected);
    this.props.updateQueryParams({ languages: newLanguagesList })
  }

  _mapArrayToSelectOptions(array) {
    return array.map((item) => ({ value: item.code, label: item.name_local }))
  }

  _extractLanguagesArray(options) {
    if (!options) return null;
    return options.map(option => option.value)
  }

  render() {
    const value = this.state.selected || [];

    return(
      <div className="col-sm-12">
        <SelectWithLabel
          label={t`What languages are you interested in?`}
          classes='no-flex'
          options={this.state.options}
          isMulti={true}
          value={value}
          handleChange={this.handleSelect}
          placeholder={t`Select as many languages as you want`}
        />
      </div>
    )
  }
}
