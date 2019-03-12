import React, { Component } from 'react'

import { CheckboxWithLabel } from 'p2pu-input-fields'
import { LANGUAGES } from '../utils/constants'

export default class LanguageFilterForm extends Component {
  constructor(props) {
    super(props)
    this.generateChangeHandler = (day) => this._generateChangeHandler(day);
  }

  _generateChangeHandler(lang) {
    return event => {
      const newLanguage = event.target.value;
      this.props.updateQueryParams({ language: newLanguage})
    }
  }

  render() {
    return(
      <div>
        {
          LANGUAGES.map((lang) => {
            const checked = this.props.language == lang.code;
            return(
              <div key={`lang-${lang.code}`} className="radio-with-label label-right col-sm-12 col-md-6 col-lg-6">
                <label>
                  <input
                    type="radio"
                    name="language"
                    value={lang.code}
                    checked={checked}
                    onChange={this.generateChangeHandler(lang)}
                    style={{ marginRight: "1rem" }}
                  />
                  { lang.label }
                </label>
              </div>
            )
          })
        }
      </div>
    )
  }
}
