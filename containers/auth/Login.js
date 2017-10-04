import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { login } from 'zc-core/auth/actions'
import { selectLoginAPIState, selectLoginErrorMessage } from 'zc-core/auth/selectors'
import { toJS } from 'zc-core/hocs'

import LoginForm from './LoginForm'
import { Logo } from '../../components'

import './style.scss'

const classes = BEMHelper({ name: 'Login' })

class Login extends React.Component {
  handleSubmit = (payload) => {
    const { email, password } = payload.toJS()
    this.props.login(email, password)
  }
  handleForgotten = () => this.props.history.push('/forgotten')

  render() {
    const { api, errorMessage } = this.props
    return (
      <div {...classes()}>
        <div {...classes('form')}>
          <Logo {...classes('logo')} large />
          <LoginForm onSubmit={this.handleSubmit} />
          {api.error && <div {...classes('error')}>{errorMessage}</div>}
          <a
            {...classes('forgotten')}
            onClick={this.handleForgotten}
            tabIndex={0}
            role="button"
          >
            Forgot password?
          </a>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  api: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

Login.defaultProps = {
  errorMessage: '',
}

const mapStateToProps = state => ({
  api: selectLoginAPIState(state),
  errorMessage: selectLoginErrorMessage(state),
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(Login))
