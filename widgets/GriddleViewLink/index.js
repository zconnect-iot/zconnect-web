import React from 'react'
import PropTypes from 'prop-types'
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
export default class GriddleViewLink extends React.Component {
  navigate = () => this.context.navigate(this.props.value)

  render() {
    const { value, className, children } = this.props;
    const onClick = typeof value === 'string' ? this.navigate : value
    return (
      <a href="#" onClick={onClick} {...classes(null, null, className)}>
        View
      </a>
    )
  }
}

GriddleViewLink.contextTypes = {
  navigate: PropTypes.func.isRequired,
}

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
