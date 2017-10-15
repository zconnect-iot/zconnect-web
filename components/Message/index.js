import React from 'react'
import PropTypes from 'prop-types'
import XDate from 'xdate'
import BEMHelper from 'react-bem-helper'

import { Icon, Button } from 'zc-web/components'

const classes = BEMHelper('Message')

export const renderAction = props => (
  <Button hollow action={props.action} {...classes('action')}>
    <Icon name={props.icon} />
  </Button>
)

const typeToIconName = {
  default: 'INFO',
  danger: 'WARNING',

  // TODO: these aren't correct but I couldn't find the appropriate icons.
  success: 'THUMB_UP',
  warning: 'THUMB_DOWN',
}

export default class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: props.expanded,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded)
      this.setState({ expanded: nextProps.expanded })
  }

  expand() {
    this.setState({ expanded: true })
    if (this.props.onExpand)
      this.props.onExpand()
  }

  contract() {
    this.setState({ expanded: false })
    if (this.props.onContract)
      this.props.onContact()
  }

  render() {
    return (
      <div {...classes(null, this.props.type)}>
        <Icon
          name={typeToIconName[this.props.type]}
          {...classes('icon', this.props.type)}
        />
        <h3 {...classes('title')}>{this.props.title}</h3>
        <h6 {...classes('subtitle')}>{this.state.subtitle}</h6>
        <div {...classes('description')}>{this.props.description}</div>
        <div {...classes('actions')}>
          {this.props.actions.map(renderAction)}
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  title: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([
    PropTypes.instanceOf(XDate),
    PropTypes.string,
  ]).isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    action: PropTypes.func,
    route: PropTypes.string,
  })).isRequired,
  onExpand: PropTypes.func,
  onContract: PropTypes.func,
  expanded: PropTypes.bool,
}

Message.defaultProps = {
  type: 'default',
  onExpand: null,
  onContract: null,
  expanded: false,
}
