import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { formValueSelector } from 'redux-form/immutable'
import { compose } from 'recompose'

import { isValidEmail } from 'zc-core/auth/utils'
import { login, loginError } from 'zc-core/auth/actions'
import { selectLoginAPIState, selectLoginErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import LoginForm from './LoginForm'
import { Logo, SimpleLink } from '../../../components'


const classes = BEMHelper({ name: 'Auth' })
const selectFormState = formValueSelector('loginForm')

class Login extends React.Component {
  handleSubmit = (payload) => {
    const { email, password } = payload.toJS()
    if (!isValidEmail(email)) return this.props.registerError('emailinvalid')
    if (!password || password.length < 8) return this.props.registerError('passwordinvalid')
    return this.props.login(email, password)
  }
  handleForgotten = () => this.props.onForgotten(this.props.email)
  render() {
    const { api, errorMessage, t, initialValues, className } = this.props
    return (
      <div {...classes(null, className)}>
        <div {...classes('form')}>
          <Logo {...classes('logo')} large center />
          <LoginForm
            api={api}
            onSubmit={this.handleSubmit}
            t={t}
            initialValues={initialValues}
          />
          {api.error && <div {...classes('error')}>{errorMessage}</div>}
          <SimpleLink action={this.handleForgotten}>
            {t('forgotten')}
          </SimpleLink>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  registerError: PropTypes.func.isRequired,
  api: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
  onForgotten: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  email: PropTypes.string,
  className: PropTypes.string,
}

Login.defaultProps = {
  errorMessage: '',
  email: '',
  className: '',
}

const mapStateToProps = (state, { email = '' }) => ({
  api: selectLoginAPIState(state),
  errorMessage: selectLoginErrorMessage(state),
  initialValues: { email },
  email: selectFormState(state, 'email'),
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  // This simulates an api error so the selector displays the appropriate message
  registerError: e => dispatch(loginError({ response: { json: { code: e } } })),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
  withTranslator,
)(Login)
