import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

const classes = BEMHelper({ name: 'Button' })

/*
  This button uses the navigate function passed to the <Page/> via react context
  to dispatch navigation actions if a route is supplied otherwise it simply calls
  the action function
*/

// eslint-disable-next-line react/prefer-stateless-function
export default class Button extends React.Component {
  navigate = () => this.context.navigate(this.props.route)
  render() {
    const { color, hollow, children, className, action, route } = this.props
    const onClick = route ? this.navigate : action
    return (
      <button
        onClick={onClick}
        {...classes(null, [color || null, hollow ? 'hollow' : null], className)}
      >
        {children}
      </button>
    )
  }
}

Button.contextTypes = {
  navigate: PropTypes.func,
}

Button.propTypes = {
  color: PropTypes.string,
  hollow: PropTypes.bool,
  action: PropTypes.func,
  route: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
}

Button.defaultProps = {
  color: null,
  hollow: null,
  children: null,
  className: '',
  action: null,
  route: null,
}
