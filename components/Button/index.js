import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { withPageContext } from '../../hocs'

import './style.scss'


const classes = BEMHelper({ name: 'Button' })

/*
  This button uses the navigate function passed to the <Page/> via react context
  to dispatch navigation actions if a route is supplied otherwise it simply calls
  the action function
*/

export class Button extends React.Component {
  navigate = () => this.props.navigate(this.props.route)
  render() {
    const { color, hollow, children, className, action, route, active, disabled } = this.props
    const onClick = route ? this.navigate : action
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        {...classes(null, { disabled, hollow, active, [color]: color }, className)}
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
  disabled: PropTypes.bool,
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
  disabled: false,
}

export default withPageContext()(Button)
