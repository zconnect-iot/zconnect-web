import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { isValidEmail } from 'zc-core/auth/utils'

import { Logo } from '../../../components'

import '../style.scss'

import RegisterForm from './RegisterForm'


const classes = BEMHelper({ name: 'Auth' })

export default class Register extends React.Component {
  handleSubmit = (_payload) => {
    const payload = _payload.toJS()
    if (_payload.size !== 6) return this.props.registerError('incomplete')
    if (!isValidEmail(payload.email)) return this.props.registerError('emailinvalid')
    if (payload.email !== payload.email2) return this.props.registerError('emailsdontmatch')
    if (payload.password !== payload.password2) return this.props.registerError('passwordsdontmatch')
    return this.props.register(payload)
  }
  render() {
    const { api, errorMessage, t, email, className } = this.props
    return (
      <div {...classes(null, className)}>
        <Logo {...classes('logo')} large />
        <RegisterForm
          pending={api.pending}
          onSubmit={this.handleSubmit}
          initialValues={{ email }}
          t={t}
        />
        {api.error && <div {...classes('error')}>{errorMessage}</div>}
        {api.success && <div {...classes('success')}>
          <p>{t('registersuccess')}</p>
          <p>{t('checkemail')}</p>
        </div>}
      </div>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  registerError: PropTypes.func.isRequired,
  email: PropTypes.string,
  api: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Register.defaultProps = {
  errorMessage: '',
  email: '',
  className: '',
}
