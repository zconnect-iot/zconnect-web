import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import animate from 'animate.css'

import style from './style.scss'

const classes = new BEMHelper('Drawer')

window.animate = animate

const positionProperties = {
  top: ['Down', 'Up', 'height', 'horizontal'],
  bottom: ['Up', 'Down', 'height', 'horizontal'],
  left: ['Left', 'Left', 'width', 'vertical'],
  right: ['Right', 'Right', 'width', 'vertical'],
}

const calculateState = ({ position, size, open }, initial = false) => {
  const [inDir, outDir, sizeKey, orientation] = positionProperties[position]
  const innerClasses = []
  if (!initial)
    innerClasses.push(
      animate.animated,
      animate[`fade${open ? 'In' : 'Out'}${open ? inDir : outDir}`],
    )
  else if (!open)
    innerClasses.push(style.hidden)
  const innerModifiers = [orientation, position, open ? 'open' : '']
  const innerStyle = size ? { [sizeKey]: size } : null

  return {
    innerClass: classes('inner', innerModifiers, innerClasses).className,
    innerStyle,
    overlayClasses: [
      animate.animated,
      open ? animate.fadeIn : animate.fadeOut,
    ],
    open,
  }
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
