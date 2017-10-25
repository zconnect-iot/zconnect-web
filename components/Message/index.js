import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import BEMHelper from 'react-bem-helper'

import { Icon, Button } from '../../components'

const classes = BEMHelper('Message')

export const renderAction = props => (
  <Button hollow action={props.action} {...classes('action')}>
    <Icon name={props.icon} size={40} />
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
    if (this.props.onExpand) this.props.onExpand()
  }

  contract() {
    this.setState({ expanded: false })
    if (this.props.onContract) this.props.onContract()
  }

  render() {
    const { renderIcon, type, title, subtitle, description, actions, codeblock, time } = this.props
    const { expanded } = this.state
    return (
      <div {...classes(null, { collapsed: !expanded })}>
        <div {...classes('header')}>
          { renderIcon ? renderIcon() : <Icon
            name={typeToIconName[type]}
            {...classes('icon', type)}
          />}
          <div {...classes('headerMiddle')}>
            <h3 {...classes('title')}>{title}</h3>
            {subtitle && <h6 {...classes('subtitle')}>{subtitle}</h6>}
            {time && <h6 {...classes('time')}>{moment(time, 'YYYYMMDD').fromNow()}</h6>}
          </div>
        </div>
        <div {...classes('body')}>
          {description && <div {...classes('description')}>{description}</div>}
          {codeblock && <div {...classes('codeblock')}>{codeblock}</div>}
          {actions && <div {...classes('actions')}>
            {actions.map(renderAction)}
          </div>}
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  time: PropTypes.oneOfType([
    PropTypes.string,
  ]),
  description: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    action: PropTypes.func,
    route: PropTypes.string,
  })),
  onExpand: PropTypes.func,
  onContract: PropTypes.func,
  expanded: PropTypes.bool,
  renderIcon: PropTypes.func,
  codeblock: PropTypes.string,
}

Message.defaultProps = {
  type: 'default',
  onExpand: null,
  onContract: null,
  expanded: false,
  renderIcon: null,
  subtitle: '',
  description: '',
  codeblock: '',
  actions: [],
  time: '',
}
