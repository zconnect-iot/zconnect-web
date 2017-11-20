import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Logo' })

export default function Logo(props) {
  const { small, large, onClick } = props
  const modifiers = [
    small ? 'small' : null,
    large ? 'large' : null,
    onClick ? 'clickable' : null,
  ]
  return (
    <div
      {...classes(null, modifiers)}
      {...props}
    />
  )
}

Logo.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
  onClick: PropTypes.func,
}

Logo.defaultProps = {
  small: false,
  large: false,
  onClick: null,
}
