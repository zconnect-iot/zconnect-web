import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { formValueSelector } from 'redux-form/immutable'
import queryString from 'query-string'

import { isValidEmail } from 'zc-core/auth/utils'
import { registerUser, registerUserError } from 'zc-core/auth/actions'
import { selectRegisterAPIState, selectRegisterErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import RegisterForm from './RegisterForm'
import { Logo } from '../../../components'

import './style.scss'

const classes = BEMHelper({ name: 'Register' })
const selectFormState = formValueSelector('registerForm')

class Register extends React.Component {
  handleSubmit = (_payload) => {
    const payload = _payload.toJS()
    if (_payload.size !== 6) return this.props.registerError('incomplete')
    if (!isValidEmail(payload.email)) return this.props.registerError('emailinvalid')
    if (payload.email !== payload.email2) return this.props.registerError('emailsdontmatch')
    if (payload.password !== payload.password2) return this.props.registerError('passwordsdontmatch')
    return this.props.register(payload)
  }
  render() {
    const { api, errorMessage, t } = this.props
    const email = queryString.parse(location.search).email
    return (
      <div {...classes()}>
        <div {...classes('form')}>
          <Logo {...classes('logo')} large />
          <RegisterForm
            pending={api.pending}
            onSubmit={this.handleSubmit}
            initialValues={{ email }}
            t={t}
          />
          {api.error && <div {...classes('error')}>{t(errorMessage)}</div>}
          {api.success && <div {...classes('success')}>
            <p>{t('registersuccess')}</p>
            <p>{t('checkemail')}</p>
          </div>}
        </div>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
}

Register.defaultProps = {
  errorMessage: '',
  email: null,
}

const mapStateToProps = state => ({
  api: selectRegisterAPIState(state),
  errorMessage: selectRegisterErrorMessage(state),
  email: selectFormState(state, 'email'),
})

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch(registerUser(payload)),
  registerError: e => dispatch(registerUserError({ detail: e })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(withTranslator(Register)))
