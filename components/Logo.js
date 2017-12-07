import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Logo' })

export default function Logo({ small, large, center }) {
  return (
    <div {...classes(null, [small ? 'small' : null, large ? 'large' : null, center ? 'center' : null])} />
  )
}

Logo.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
  center: PropTypes.bool,
}

Logo.defaultProps = {
  small: false,
  large: false,
  center: false,
}
