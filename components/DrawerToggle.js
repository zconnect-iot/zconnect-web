import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import Drawer from './Drawer'
import Icon from './Icon'

const classes = BEMHelper('DrawerToggle')

/**
 * Component which can toggle a <Drawer /> on and off.
 *
 * Passes children, position and open/close handlers through to the Drawer.
 */
export default class DrawerToggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }

    this.toggleDrawer = this.toggleDrawer.bind(this)
    this.onDrawerOpened = () => this.onDrawerToggled(true)
    this.onDrawerClosed = () => this.onDrawerToggled(false)
  }

  onDrawerToggled(isOpen) {
    if (this.state.open !== isOpen) {
      this.setState({ open: isOpen })
      if (isOpen) {
        if (this.props.onOpen)
          this.props.onOpen()
      }
      else if (this.props.onClose)
        this.props.onClose()
    }
  }

  toggleDrawer = () => {
    this.setState({ open: !this.state.open })
  }

  getChildContext() {
    return { toggleDrawer : this.toggleDrawer }
  }

  render() {
    return (
      <div {...classes(null, null, this.props.className)}>
        <button
          type="button"
          onClick={this.toggleDrawer}
          {...classes('button', null, { open: this.state.open })}
        >
          <Icon name={this.props.iconName} />
        </button>

        <Drawer
          open={this.state.open}
          position={this.props.position}
          onOpen={this.onDrawerOpened}
          onClose={this.onDrawerClosed}
        >
          {this.props.children}
        </Drawer>
      </div>
    )
  }
}

DrawerToggle.childContextTypes = {
  toggleDrawer: PropTypes.func,
}

DrawerToggle.propTypes = {
  iconName: PropTypes.string.isRequired,
  position: PropTypes.string,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

DrawerToggle.defaultProps = {
  position: 'right',
  onOpen: null,
  onClose: null,
  className: '',
  children: null,
}
