import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = BEMHelper({ name: 'Spinner' })

export default function Spinner(props) {
  return (
    <div {...classes(null, props)}>
      Spinner
      <div className="lds-dual-ring" />
    </div>
  )
}

Spinner.propTypes = {
  small: PropTypes.bool,
  large: PropTypes.bool,
  full: PropTypes.bool,
}

Spinner.defaultProps = {
  small: false,
  large: false,
  full: false,
}
