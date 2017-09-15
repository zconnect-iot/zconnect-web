import React from 'react'
import PropTypes from 'react-proptypes'
import BEMHelper from 'react-bem-helper'
import { Icon } from '../../components'

import './style.scss'

const classes = BEMHelper({ name: 'Tooltip' })

export default function Tooltip({ children }) {
  return (
    <span {...classes()}>
      <Icon {...classes('icon')} size={22} name="INFO" />
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
}
