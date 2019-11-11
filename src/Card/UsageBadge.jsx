import React from 'react'
import { t, ngettext, msgid } from 'ttag';

const UsageBadge = ({ number, id }) => {
  const display = number > 0
  const icon = number === 1 ? 'done' : 'done_all';
  const tooltipText = ngettext(
    msgid`Used by ${number} learning circle`,
    `Used by ${number} learning circles`,
    number
  );

  if (display) {
    return (
      <div className='usage-badge' data-toggle="tooltip" data-placement="bottom" title={tooltipText}>
        <div className='text'>
          <i className="material-icons">{icon}</i>{number}
        </div>
      </div>
    );
  } else {
    return null
  }
}

export default UsageBadge
