import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Icon } from '../../components'
import { SimpleLink } from '../../components'

import './style.scss'

const classes = new BEMHelper('Modal')

/*
  A simple full screen opacity with a panel that renders children within
  it's content. An onClose function must be passed to make the close and
  opacity onClick work as expected but it's up to the containing component
  to mount and unmount the Modal
*/

export default class Modal extends React.PureComponent {
  onClose = (e) => {
    if (e.target.classList.contains('Modal')) this.props.onClose()
  }
  render() {
    const { onClose, title, className, children, dismissable } = this.props
    return (
      <div
        {...classes(null, null, className)}
        onClick={this.onClose}
        role="presentation"
      >
        <div {...classes('content')}>
          <div {...classes('header')}>
            {title}
            { dismissable &&
              <SimpleLink action={onClose}><Icon name="CLOSE" size={24} /></SimpleLink>
            }
          </div>
          <div {...classes('body')}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  dismissable: PropTypes.bool,
}

Modal.defaultProps = {
  className: '',
  onClose: () => {},
  title: '',
  dismissable: true,
}
