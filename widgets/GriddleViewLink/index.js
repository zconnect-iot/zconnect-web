import React from 'react'
import { Link } from 'react-router-dom'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('GriddleViewLink')

/**
 * Simple 'View' link which can be used in a Griddle table with a URL column.
 *
 * @example
 * // Using a Griddle ColumnDefinition:
 * <ColumnDefinition
 *   id="link"
 *   key="link"
 *   title="Link"
 *   customComponent={GriddleViewLink}
 * />,
 *
 */
export default ({ value, className }) => (
  <Link to={value} {...classes(null, null, className)}>
    View
  </Link>
)
