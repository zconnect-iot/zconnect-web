import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('Modal')

export default class Modal extends React.PureComponent {
  render() {
    return (
      <div {...classes(null, { visible: this.props.show }, this.props.className)}>
        <div {...classes('content')}>
          <div {...classes('header')}>{this.props.title}</div>
          <div {...classes('body')}>
            {this.props.children}
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
  ]),
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  show: PropTypes.bool,
  onClose: PropTypes.func,
}

Modal.defaultProps = {
  children: null,
  className: '',
  show: true,
  onClose: () => {},
  title: '',
}
