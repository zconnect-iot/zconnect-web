import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { withPageContext } from '../hocs'

const classes = BEMHelper({ name: 'Button' })

/*
  This button uses the navigate function passed to the <Page/> via react context
  to dispatch navigation actions if a route is supplied otherwise it simply calls
  the action function
*/

class Button extends React.Component {
  navigate = () => this.props.navigate(this.props.route)
  render() {
    const { color, hollow, children, className, action, route, active } = this.props
    const onClick = route ? this.navigate : action
    return (
      <button
        onClick={onClick}
        {...classes(null, { hollow, active, color }, className)}
      >
        {children}
      </button>
    )
  }
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
  active: PropTypes.bool,
  navigate: PropTypes.func,
}

Button.defaultProps = {
  color: null,
  hollow: null,
  children: null,
  className: '',
  action: null,
  route: null,
  active: false,
  navigate: () => {},
}

export default withPageContext()(Button)
