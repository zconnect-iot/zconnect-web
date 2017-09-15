import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Button' })

export default function Button({ color, hollow, children, className }) {
  return (
    <button {...classes(null, [color || null, hollow ? 'hollow' : null], className)}>
      {children}
    </button>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  hollow: PropTypes.string,
  children: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
}
