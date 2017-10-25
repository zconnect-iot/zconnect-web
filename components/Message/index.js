import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import BEMHelper from 'react-bem-helper'

import { Icon, Button, Codeblock } from '../../components'

import './style.scss'

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
      focused: props.focused,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded)
      this.setState({ expanded: nextProps.expanded, focused: nextProps.focused })
  }

  expand = () => {
    this.setState({ expanded: true, focused: true })
    if (this.props.onExpand) this.props.onExpand()
  }

  contract = () => {
    this.setState({ expanded: false, focused: true })
    if (this.props.onContract) this.props.onContract()
  }

  toggle = () => {
    if (this.state.expanded) return this.contract()
    return this.expand()
  }

  render() {
    const { renderIcon, type, title, subtitle, description, actions, codeblock, time } = this.props
    const { expanded, focused } = this.state
    return (
      <div {...classes(null, { collapsed: !expanded, focused }, this.props.className)}>
        <div {...classes('left')}>
          { renderIcon ? renderIcon() : <Icon
            name={typeToIconName[type]}
            size={40}
            {...classes('icon', type)}
          />}
        </div>
        <div {...classes('right')}>
          <div {...classes('header')}>
            <div {...classes('headerMiddle')}>
              <h5 {...classes('title')}>{title}</h5>
              {subtitle && <h6 {...classes('subtitle')}>{subtitle}</h6>}
              {time && <h6 {...classes('time')}>{moment(time, 'YYYYMMDD').fromNow()}</h6>}
            </div>
            <Icon {...classes('toggle')} name={`CHEVRON_${expanded ? 'UP' : 'DOWN'}`} onClick={this.toggle} size={34} />
          </div>
          <div {...classes('body')}>
            {description && <div {...classes('description')}>{description}</div>}
            {codeblock && <Codeblock>{codeblock}</Codeblock>}
            {actions && <div {...classes('actions')}>
              {actions.map(renderAction)}
            </div>}
          </div>
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
  className: PropTypes.string,
  focused: PropTypes.bool,
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
  className: '',
  focused: false,
}
