import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import animate from 'animate.css'
import upperFirst from 'lodash/upperFirst'

import style from './style.scss'

const classes = new BEMHelper('Drawer')

window.animate = animate

const calculateState = ({ position, size, open }, initial = false) => {
  const isHoriz = position === 'top' || position === 'bottom'
  const inOrOut = open ? 'In' : 'Out'
  const state = {
    innerMods: {
      horizontal: isHoriz,
      vertical: !isHoriz,
      [position]: true,
      open,
    },
    innerClasses: initial ? [style.hidden] : [
      animate.animated,
      animate[`fade${inOrOut}${upperFirst(position)}`],
    ],
    overlayClasses: [
      animate.animated,
      open ? animate.fadeIn : animate.fadeOut,
    ],
    style: {},
    open,
  }
  console.log('innerClasses', state.innerClasses)

  if (size)
    state.style[isHoriz ? 'width' : 'height'] = size

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
    return (
      <div {...classes(null, { [position]: true, open: this.state.open })}>
        {this.state.open && (
          <div
            role="presentation"
            onClick={this.onCloseClick}
            {...classes('overlay', null, this.state.overlayClasses)}
          />
        )}

        <div {...classes('inner', this.state.innerMods, this.state.innerClasses)}>
          {this.state.open && children}
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
