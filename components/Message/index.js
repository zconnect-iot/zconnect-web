import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import BEMHelper from 'react-bem-helper'
import scrollToElement from 'scroll-to-element'

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

  componentDidMount() {
    if (this.props.focused) scrollToElement(this.ref)
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.expanded !== this.props.expanded)
      this.setState({ expanded: nextProps.expanded })
    if (nextProps.focused && (nextState.expanded !== this.state.expanded)) {
      // Have to wait for the expanded css transition to finish before scrolling
      clearTimeout(this.scroll)
      this.scroll = setTimeout(() => scrollToElement(this.ref, { align: 'middle' }), 100)
    }
  }

  setRef = (ref) => {
    this.ref = ref
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
    const {
      renderIcon, type, title, subtitle, children, time, focused } = this.props
    const { expanded } = this.state
    return (
      <div
        ref={this.setRef}
        {...classes(null, { collapsed: !expanded, focused }, this.props.className)}
      >
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
              {subtitle && <h6 {...classes('subtitle')}>{subtitle}</h6>}
              {time && <h6 {...classes('time')}>{moment(time, 'YYYYMMDD').fromNow()}</h6>}
            </div>
            <Icon {...classes('toggle')} name={`CHEVRON_${expanded ? 'UP' : 'DOWN'}`} onClick={this.toggle} size={34} />
          </div>
          <div {...classes('body')}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Message.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  time: PropTypes.oneOfType([
    PropTypes.string,
  ]),
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
  ]).isRequired,
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
}
