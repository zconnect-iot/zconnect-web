import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from '../../'

/**
  Styled map marker using the LOCATION_ON icon
*/

export default function Marker({ color }) {
  return (<div className="Map__Marker">
    <Icon name="LOCATION_ON" color={color} size={40} />
  </div>)
}

Marker.propTypes = {
  color: PropTypes.string.isRequired,
}
