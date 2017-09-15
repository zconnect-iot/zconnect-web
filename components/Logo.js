import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Logo' })

export default function Logo({ small }) {
  return (
    <div {...classes(null, small ? 'small' : null)} />
  )
}

Logo.propTypes = {
  small: PropTypes.bool,
}

Logo.defaultProps = {
  small: false,
}
