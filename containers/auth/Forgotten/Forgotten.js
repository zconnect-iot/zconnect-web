import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { isValidEmail } from 'zc-core/auth/utils'
import ForgottenForm from './ForgottenForm'
import { Logo } from '../../../components'

const classes = BEMHelper({ name: 'Auth' })

class Forgotten extends React.Component {
  handleSubmit = (payload) => {
    const { email } = payload.toJS()
    if (!isValidEmail(email)) return this.props.registerError('emailinvalid')
    return this.props.reset(email)
  }

  render() {
    const { api, errorMessage, t, email, className } = this.props
    return (
      <div {...classes(null, className)}>
        <div {...classes('form')}>
          <Logo {...classes('logo')} large />
          <ForgottenForm
            onSubmit={this.handleSubmit}
            initialValues={{ email }}
            t={t}
            pending={api.pending}
          />
          {api.error && <div {...classes('error')}>{errorMessage}</div>}
          {api.success && <div {...classes('success')}>
            <p>{t('success')}</p>
            <p>{t('emailsent')}</p>
          </div>}
        </div>
      </div>
    )
  }
}

Forgotten.propTypes = {
  reset: PropTypes.func.isRequired,
  registerError: PropTypes.func.isRequired,
  api: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
  t: PropTypes.func.isRequired,
  email: PropTypes.string,
  className: PropTypes.string,
}

Forgotten.defaultProps = {
  errorMessage: '',
  email: '',
  className: '',
}

export { Forgotten }
