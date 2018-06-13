import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Modal from './Modal'

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
      <ReactCSSTransitionGroup
        transitionName="modal"
        transitionEnterTimeout={200}
        transitionLeave
        transitionLeaveTimeout={200}
      >
        {this.state.visible && <Modal {...modalProps} onClose={this.closeModal} />}
      </ReactCSSTransitionGroup>
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
  title: '',
  visible: true,
  onClose: () => {},
}
