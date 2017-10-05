import React from 'react'
import PropTypes from 'prop-types'
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
const GriddleViewLink = ({ value, className }) => (
  <Link to={value} {...classes(null, null, className)}>
    View
  </Link>
)

GriddleViewLink.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string,
}

GriddleViewLink.defaultProps = {
  className: '',
}

export default GriddleViewLink
