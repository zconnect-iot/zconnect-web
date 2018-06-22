import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import { resetPasswordConfirm, resetPasswordConfirmError } from 'zc-core/auth/actions'
import { selectResetPasswordConfirmAPIState, selectResetPasswordConfirmErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import PasswordConfirmComponent from './PasswordConfirm'


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

const ComposedPasswordConfirm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
  withTranslator,
)(PasswordConfirmComponent)

/**
  Password change form after user has followed reset password link.

  The uid and token props have to be stripped from the url by the consuming project
*/

export default function PasswordConfirm(props) {
  return <ComposedPasswordConfirm {...props} />
}

PasswordConfirm.propTypes = {
  token: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
}
