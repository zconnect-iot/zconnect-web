import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Logo' })

export default function Logo({ small, large }) {
  return (
    <div {...classes(null, [small ? 'small' : null, large ? 'large' : null])} />
  )
}

Logo.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
}

Logo.defaultProps = {
  small: false,
  large: false,
}
