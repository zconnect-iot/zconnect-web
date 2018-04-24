import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { formValueSelector } from 'redux-form/immutable'

import { isValidEmail } from 'zc-core/auth/utils'
import { login, loginError } from 'zc-core/auth/actions'
import { selectLoginAPIState, selectLoginErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import LoginForm from './LoginForm'
import { Logo } from '../../../components'

import './style.scss'

const classes = BEMHelper({ name: 'Login' })
const selectFormState = formValueSelector('loginForm')

class Login extends React.Component {
  handleSubmit = (payload) => {
    const { email, password } = payload.toJS()
    if (!isValidEmail(email)) return this.props.registerError('emailinvalid')
    if (password.length < 8) return this.props.registerError('passwordinvalid')
    return this.props.login(email, password)
  }
  handleForgotten = () => {
    const { history, email } = this.props
    const queryString = email ? `?email=${encodeURIComponent(email)}` : ''
    history.push(`/forgotten${queryString}`)
  }
  render() {
    const { api, errorMessage, t } = this.props
    return (
      <div {...classes()}>
        <div {...classes('form')}>
          <Logo {...classes('logo')} large center />
          <LoginForm onSubmit={this.handleSubmit} t={t} />
          {api.error && <div {...classes('error')}>{t(errorMessage)}</div>}
          <a
            {...classes('forgotten')}
            onClick={this.handleForgotten}
            tabIndex={0}
            role="button"
          >
            {t('forgotten')}
          </a>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  registerError: PropTypes.func.isRequired,
  email: PropTypes.string,
  api: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

Login.defaultProps = {
  errorMessage: '',
  email: null,
}

const mapStateToProps = state => ({
  api: selectLoginAPIState(state),
  errorMessage: selectLoginErrorMessage(state),
  email: selectFormState(state, 'email'),
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  registerError: e => dispatch(loginError({ detail: e })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(withTranslator(Login)))
