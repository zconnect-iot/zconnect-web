import React from 'react'

import { Icon } from 'zc-web/components'


const PreviousButton = ({ hasPrevious, onClick, className }) => (hasPrevious ? (
  <button type="button" onClick={onClick} className={className}>
    <Icon name="CHEVRON_LEFT" size={24} />
  </button>
) : null)

export default PreviousButton
