import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('Drawer')

const calculateState = ({ position, size, open }) => {
  const isHoriz = position === 'top' || position === 'bottom'
  const state = {
    modifiers: {
      hidden: !open,
      horizontal: isHoriz,
      vertical: !isHoriz,
      [position]: true,
    },
    style: {},
    open,
  }

  if (size)
    state.style[isHoriz ? 'width' : 'height'] = size

  return state
}

export default class Drawer extends React.Component {
  constructor(props) {
    super(props)
    this.onCloseClick = () => this.state.open && this.close()
    this.state = calculateState(props)
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
    if (!this.state.open)
      return null

    const { position, children } = this.props
    return (
      <div {...classes(null, { position, open: true })}>
        <div
          role="presentation"
          onClick={this.onCloseClick}
          {...classes('overlay')}
        />

        <div {...classes('inner', this.state.modifiers)}>
          {children}
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
