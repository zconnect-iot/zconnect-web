import React from 'react'
import { Link } from 'react-router-dom'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('GriddleViewLink')

export default ({ value, className }) => (
  <Link to={value} {...classes(null, null, className)}>
    View
  </Link>
)
