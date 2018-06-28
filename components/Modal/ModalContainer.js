import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { noop } from 'lodash'

import Modal from './Modal'
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first
import vars from '!!sass-vars-to-js-loader!./style.scss'

/*
  ModalContainer maintains the visibility of the Modal in state and
  enables leave animations because the ReactCSSTransitionGroup stays
  mounted
*/

export default class ModalContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible,
    }
  }
  componentWillReceiveProps({ visible }) {
    if (visible !== this.state.visible) this.setState({ visible })
  }
  closeModal = () => {
    this.setState({ visible: false })
    this.props.onClose()
  }
  render() {
    const { visible, ...modalProps } = this.props
    return (
      <CSSTransition
        classNames="modal"
        timeout={vars.modalTransitionDuration || 300}
        in={this.state.visible}
        mountOnEnter
        unmountOnExit
      >
        {() => <Modal {...modalProps} onClose={this.closeModal} />}
      </CSSTransition>
    )
  }
}

ModalContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}

ModalContainer.defaultProps = {
  visible: true,
  onClose: noop,
}
