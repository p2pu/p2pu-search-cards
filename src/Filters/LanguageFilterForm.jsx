import React, { Component } from 'react'
import { t } from 'ttag';
import ApiHelper from '../utils/apiHelper'

import SelectWithLabel from '../InputFields/SelectWithLabel'

export default class LanguageFilterForm extends Component {
  constructor(props) {
    super(props)
    this.state = { options: [] };
  }

  componentDidMount() {
    this.fetchLanguages();
  }

  fetchLanguages = () => {
    const resourceType = `coursesLanguages`;
    const api = new ApiHelper(resourceType);
    const params = {};
    const callback = (response) => {
      const options = this.mapArrayToSelectOptions(response.languages);
      this.setState({ options })
    }

    api.fetchResource({ params, callback })
  }

  handleSelect = (selected) => {
    this.props.updateQueryParams(selected)
  }

  mapArrayToSelectOptions = (array) => {
    return array.map((item) => ({ value: item.code, label: item.name_local }))
  }

  render() {
    console.log('this.props.languages', this.props.languages)
    return(
      <div className="col-sm-12">
        <SelectWithLabel
          name={'languages'}
          label={t`What languages are you interested in?`}
          classes='no-flex'
          options={this.state.options}
          isMulti={true}
          value={this.props.languages}
          handleChange={this.handleSelect}
          helpText={t`Select as many languages as you want`}
        />
      </div>
    )
  }
}
