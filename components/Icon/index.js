import React from 'react'
import PropTypes from 'react-proptypes'
import BEMHelper from 'react-bem-helper'
import ICONS from '../../assets/icons/map.json'

import './style.scss'

const classes = BEMHelper({ name: 'Icon' })

export default function Icon({ name, color, size, className }) {
  const styles = {
    svg: {
      [color ? 'fill' : null]: color, // Only set `fill` if color specified, will inherit from parent by default
    },
  }
  const d = ICONS[name]

  return (
    <svg
      {...classes(null, name, className)}
      style={styles.svg}
      width={`${size}px`}
      height={`${size}px`}
      viewBox="-3 -3 24 24"
    >
      <path
        d={d}
      />
    </svg>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.number,
  size: PropTypes.number,
  className: PropTypes.string,
}

Icon.defaultProps = {
  size: 16,
  color: null,
  className: null,
}
