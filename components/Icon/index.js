import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import ICONS from '../../assets/icons/map.json'

const classes = BEMHelper({ name: 'Icon' })

export default function Icon({ name, color, size, className, onClick }) {
  const { transform, d } = ICONS[name]
  const fill = color ? `text-${color}` : null

  return (
    <svg
      {...classes(null, name, [fill, className])}
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
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  size: null,
  color: '',
  className: '',
  onClick: () => {},
}
