import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { compose } from 'recompose'

import { resetPasswordConfirm, resetPasswordConfirmError } from 'zc-core/auth/actions'
import { selectResetPasswordConfirmAPIState, selectResetPasswordConfirmErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import PasswordConfirmForm from './PasswordConfirmForm'
import { Logo } from '../../../components'


const classes = BEMHelper({ name: 'Auth' })

class PasswordConfirm extends React.Component {
  componentWillReceiveProps(props) {
    if (props.onSuccess && props.api.error) props.onSuccess()
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
        <div {...classes('form')}>
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

const mapStateToProps = state => ({
  api: selectResetPasswordConfirmAPIState(state),
  errorMessage: selectResetPasswordConfirmErrorMessage(state),
})

const mapDispatchToProps = (dispatch, { token, uid }) => ({
  submit: payload => dispatch(
    resetPasswordConfirm({ uid, token, ...payload }),
  ),
  registerError: e => dispatch(resetPasswordConfirmError({ response: { json: { code: e } } })),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
  withTranslator,
)(PasswordConfirm)
