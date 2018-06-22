import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { isValidEmail } from 'zc-core/auth/utils'

import LoginForm from './LoginForm'
import { Logo, SimpleLink } from '../../../components'

import '../style.scss'

const classes = BEMHelper({ name: 'Auth' })

export default class Login extends React.Component {
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
