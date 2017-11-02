import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = BEMHelper({ name: 'Spinner' })

export default function Spinner(props) {
  const { className, full } = props
  const size = full ? 100 : props.size
  return (
    <div {...classes(null, full && 'full', className)}>
      <div className="lds-dual-ring" style={{ width: `${size}px`, height: `${size}px` }}>
        <div style={{ borderWidth: `${size / 20}px` }} />
      </div>
    </div>
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
  full: PropTypes.bool,
  className: PropTypes.string,
}

Spinner.defaultProps = {
  size: 30,
  full: false,
  className: '',
}
