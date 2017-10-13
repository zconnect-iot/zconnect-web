import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import animate from 'animate.css'
import upperFirst from 'lodash/upperFirst'

import style from './style.scss'

const classes = new BEMHelper('Drawer')

const calculateState = ({ position, size, open }, initial = false) => {
  const isHoriz = position === 'top' || position === 'bottom'
  const inOrOut = open ? 'In' : 'Out'
  const innerClasses = []
  if (initial) {
    if (!open)
      innerClasses.push(style.hidden)
  }
  else
    innerClasses.push(
      animate.animated,
      animate[`fade${inOrOut}${upperFirst(position)}`],
    )
  const innerModifiers = {
    horizontal: isHoriz,
    vertical: !isHoriz,
    [position]: true,
    open,
  }
  const innerStyle = size ? { [isHoriz ? 'width' : 'height']: size } : null

  const state = {
    innerClass: classes('inner', innerModifiers, innerClasses).className,
    innerStyle,
    overlayClasses: [
      animate.animated,
      open ? animate.fadeIn : animate.fadeOut,
    ],
    open,
  }

  return state
}

export default class Drawer extends React.Component {
  constructor(props) {
    super(props)
    this.onCloseClick = () => this.state.open && this.close()
    this.state = calculateState(props, true)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(calculateState(nextProps))
    if (nextProps.open !== this.props.open)
      if (nextProps.open) this.open()
      else this.close()
  }

  open() {
    this.setState({ open: true })
    if (this.props.onOpen)
      this.props.onOpen()
  }

  close() {
    this.setState({ open: false })
    if (this.props.onClose)
      this.props.onClose()
  }

  render() {
    const { position, children } = this.props
    const { open, innerClass, innerStyle, overlayClasses } = this.state
    return (
      <div {...classes(null, { [position]: true, open })}>
        {open && (
          <div
            role="presentation"
            onClick={this.onCloseClick}
            {...classes('overlay', null, overlayClasses)}
          />
        )}

        <div className={innerClass} style={innerStyle}>
          {open && children}
        </div>
      </div>
    )
  }
}

Drawer.propTypes = {
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  size: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Drawer.defaultProps = {
  position: 'right',
  open: false,
  onOpen: null,
  onClose: null,
  size: null,
  children: null,
}
