import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import ICONS from '../../assets/icons/map.json'

const classes = BEMHelper({ name: 'Icon' })

export default function Icon({ name, color, size, className, onClick }) {
  const styles = {
    svg: {
      [color ? 'fill' : null]: color, // Only set `fill` if color specified, will inherit from parent by default
    },
  }
  const { transform, d } = ICONS[name]

  return (
    <svg
      {...classes(null, name, className)}
      style={styles.svg}
      width={size ? `${size}px` : '100%'}
      height={size ? `${size}px` : '100%'}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path
        transform={transform}
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
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  size: null,
  color: null,
  className: null,
  onClick: () => {},
}
