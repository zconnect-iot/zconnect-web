import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('Link')

/**
 * Link component.
 *
 * Can be used as a normal link:
 * @example
 * <Link value={href}>Click me!</Link>
 *
 * Can also be used as a Griddle column component (in this case the anchor will
 * have `innerText` `"View"`):
 * @example
 * <ColumnDefinition
 *   id="link"
 *   key="link"
 *   title="Link"
 *   customComponent={Link}
 * />
 */
export default class Link extends React.Component {
  navigate = () => this.context.navigate(this.props.value)

  render() {
    const { value, className, children } = this.props
    const contents = children || 'View'
    return (
      <a
        href={value}
        onClick={this.navigate}
        {...classes(null, null, className)}
      >
        {contents}
      </a>
    )
  }
}

Link.contextTypes = {
  navigate: PropTypes.func.isRequired,
}

Link.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Link.defaultProps = {
  className: '',
  children: null,
}
