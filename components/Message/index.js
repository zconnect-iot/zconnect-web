import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import BEMHelper from 'react-bem-helper'

import { instanceOfXDate } from 'zc-core/utils/propTypes'

import { Icon } from '../../components'

import './style.scss'

const classes = BEMHelper('Message')

const typeToIconName = {
  default: 'INFO',
  danger: 'WARNING',

  // TODO: these aren't correct but I couldn't find the appropriate icons.
  success: 'THUMB_UP',
  warning: 'THUMB_DOWN',
}

export default class Message extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      expanded: props.expanded,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) this.setState({ expanded: nextProps.expanded })
  }

  expand = () => {
    this.setState({ expanded: true })
    if (this.props.onExpand) this.props.onExpand(this.props)
  }

  contract = () => {
    this.setState({ expanded: false })
    if (this.props.onContract) this.props.onContract(this.props)
  }

  toggle = () => {
    if (this.props.onToggle) this.props.onToggle(this.props)
    if (this.state.expanded) return this.contract()
    return this.expand()
  }

  render() {
    const { renderIcon, type, title, subtitle, children, time, focused } = this.props
    const { expanded } = this.state
    return (
      <div {...classes(null, { collapsed: !expanded, focused }, this.props.className)}>
        <div {...classes('left')}>
          { renderIcon ? renderIcon(this.props) : <Icon
            name={typeToIconName[type]}
            size={40}
            {...classes('icon', type)}
          />}
        </div>
        <div {...classes('right')}>
          <div {...classes('header')}>
            <div {...classes('headerMiddle')}>
              <h5 {...classes('title')}>{title}</h5>
              {subtitle && <span {...classes('subtitle')}>{subtitle}</span>}
              {time && <span {...classes('time')}>{moment(time.toISOString()).fromNow()}</span>}
            </div>
            { children ?
              <Icon
                {...classes('toggle')}
                name={`CHEVRON_${expanded ? 'UP' : 'DOWN'}`}
                onClick={this.toggle}
                size={34}
              /> :
              null
            }
          </div>
          { children && expanded ? <div {...classes('body')}>{children}</div> : null }
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  time: instanceOfXDate,
  onExpand: PropTypes.func,
  onContract: PropTypes.func,
  onToggle: PropTypes.func,
  expanded: PropTypes.bool,
  renderIcon: PropTypes.func,
  className: PropTypes.string,
  focused: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

Message.defaultProps = {
  type: 'default',
  onExpand: null,
  onContract: null,
  onToggle: null,
  expanded: false,
  renderIcon: null,
  subtitle: '',
  time: '',
  className: '',
  focused: false,
  children: null,
}
