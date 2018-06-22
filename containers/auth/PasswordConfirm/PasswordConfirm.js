import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import PasswordConfirmForm from './PasswordConfirmForm'
import { Logo } from '../../../components'

import '../style.scss'


const classes = BEMHelper({ name: 'Auth' })

export default class PasswordConfirm extends React.Component {
  componentWillReceiveProps(props) {
    if (props.onSuccess && props.api.success) props.onSuccess()
  }
  handleSubmit = (_payload) => {
    const payload = _payload.toJS()
    if (payload.new_password1.length < 8) return this.props.registerError('passwordinvalid')
    if (payload.new_password1 !== payload.new_password2) return this.props.registerError('passwordsdontmatch')
    return this.props.submit(payload)
  }
  render() {
    const { api, errorMessage, t, className } = this.props
    return (
      <div {...classes(null, className)}>
        <Logo {...classes('logo')} large />
        <PasswordConfirmForm
          pending={api.pending}
          onSubmit={this.handleSubmit}
          t={t}
        />
        {api.error && <div {...classes('error')}>{errorMessage}</div>}
        {api.success && <div {...classes('success')}>
          <p>{t('success')}</p>
        </div>}
      </div>
    )
  }
}

PasswordConfirm.propTypes = {
  submit: PropTypes.func.isRequired,
  registerError: PropTypes.func.isRequired,
  api: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
  className: PropTypes.string,
}

PasswordConfirm.defaultProps = {
  errorMessage: '',
  onSuccess: null,
  className: '',
}
