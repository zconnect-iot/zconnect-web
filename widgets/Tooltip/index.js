import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { Icon } from '../../components'

import './style.scss'

const classes = BEMHelper({ name: 'Tooltip' })

export default function Tooltip({
  children, size, icon, color, className,
}) {
  return (
    <span {...classes(null, null, className)}>
      <Icon {...classes('icon')} size={size} name={icon} color={color} />
      <div {...classes('message')}>
        {children}
      </div>
    </span>
  )
}

Tooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  size: PropTypes.number,
  icon: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
}

Tooltip.defaultProps = {
  size: 20,
  icon: 'INFO',
  className: '',
  color: null, // Default to parent element fil colour
}
