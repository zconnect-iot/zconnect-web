import React from 'react'

import { Icon } from 'zc-web/components'


const NextButton = ({ hasNext, onClick, className }) => (hasNext ? (
  <button type="button" onClick={onClick} className={className}>
    <Icon name="CHEVRON_RIGHT" size={24} />
  </button>
) : null)

export default NextButton
