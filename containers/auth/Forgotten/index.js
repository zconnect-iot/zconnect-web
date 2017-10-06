import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import queryString from 'query-string'

import { isValidEmail } from 'zc-core/auth/utils'
import { resetPassword, resetPasswordError } from 'zc-core/auth/actions'
import { selectResetPasswordAPIState, selectForgottenPasswordErrorMessage } from 'zc-core/auth/selectors'
import { toJS } from 'zc-core/hocs'

import ForgottenForm from './ForgottenForm'
import { Logo } from '../../../components'

import './style.scss'

const classes = BEMHelper({ name: 'Forgotten' })

class Forgotten extends React.Component {
  handleSubmit = (payload) => {
    const { email } = payload.toJS()
    if (!isValidEmail(email)) return this.props.registerError('emailinvalid')
    return this.props.reset(email)
  }

  render() {
    const { api, errorMessage, location } = this.props
    const { t } = this.context
    const email = queryString.parse(location.search).email
    return (
      <div {...classes()}>
        <div {...classes('form')}>
          <Logo {...classes('logo')} large />
          <ForgottenForm onSubmit={this.handleSubmit} initialValues={{ email }} />
          {api.error && <div {...classes('error')}>{t(errorMessage)}</div>}
          {api.success && <div {...classes('success')}>
            <p>{t('success')}</p>
            <p>{t('emailsent')}</p>
          </div>}
        </div>
      </div>
    )
  }
}

Forgotten.contextTypes = {
  t: PropTypes.func,
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
}

Forgotten.defaultProps = {
  errorMessage: '',
}

const mapStateToProps = state => ({
  api: selectResetPasswordAPIState(state),
  errorMessage: selectForgottenPasswordErrorMessage(state),
})

const mapDispatchToProps = dispatch => ({
  reset: email => dispatch(resetPassword({ email })),
  registerError: e => dispatch(resetPasswordError({ title: e })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(Forgotten))
