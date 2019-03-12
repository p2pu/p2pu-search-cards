import React from 'react'

import { CheckboxWithLabel } from 'p2pu-input-fields'
import { LANGUAGES } from '../utils/constants'

const LanguageFilterForm = props => {

  const handleChange = event => {
    const language = event.target.value;
    props.updateQueryParams({ language })
    props.closeFilter()
  }

  return(
    <div>
      {
        LANGUAGES.map((lang) => {
          const checked = props.language == lang.code;
          return(
            <div key={`lang-${lang.code}`} className="radio-with-label label-right col-sm-12 col-md-6 col-lg-6">
              <label>
                <input
                  type="radio"
                  name="language"
                  value={lang.code}
                  checked={checked}
                  onChange={handleChange}
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

export default LanguageFilterForm;