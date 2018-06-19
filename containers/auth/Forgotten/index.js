import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import { resetPassword, resetPasswordError } from 'zc-core/auth/actions'
import { selectResetPasswordAPIState, selectResetPasswordErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import { Forgotten as Uncomposed } from './Forgotten'

const mapStateToProps = state => ({
  api: selectResetPasswordAPIState(state),
  errorMessage: selectResetPasswordErrorMessage(state),
})

const mapDispatchToProps = dispatch => ({
  reset: email => dispatch(resetPassword({ email })),
  registerError: e => dispatch(resetPasswordError({ response: { json: { code: e } } })),
})

const Composed = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
  withTranslator,
)(Uncomposed)

export default function Forgotten({ ...props }) {
  return <Composed {...props} />
}

// Forgotten.propTypes = {}
