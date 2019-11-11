import React from 'react'
import { t } from 'ttag';
import { SwitchWithLabels } from 'p2pu-input-fields'


const OerFilterForm = (props) => {
  const formValues = {
    true: t`Only open educational resources (OER)`,
    false: t`All courses`
  }

  const handleSelect = (oer) => {
    props.updateQueryParams({ oer })
  }

  return(
    <SwitchWithLabels
      name="order-courses"
      labelRight={formValues.true}
      labelLeft={formValues.false}
      onChange={handleSelect}
      defaultChecked={Boolean(props.oer)}
    />
  )
}

export default OerFilterForm;
