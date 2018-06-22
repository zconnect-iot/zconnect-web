import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form/immutable'
import { compose } from 'recompose'

import { login, loginError } from 'zc-core/auth/actions'
import { selectLoginAPIState, selectLoginErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import LoginComponent from './Login'

const selectFormState = formValueSelector('loginForm')


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

const ComposedLogin = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
  withTranslator,
)(LoginComponent)

/**
  Depends on Translator context provider as well as the react-redux store

  Uses the auth actions, selectors and sagas in zconnect-js to trigger a login
  request
*/
export default function Login({ ...props }) {
  return <ComposedLogin {...props} />
}

Login.propTypes = {
  className: PropTypes.string,
  /** Will pre populate form if passed */
  email: PropTypes.string,
  /** Call back action for the 'Forgotten password' link (should redirect to Forgotten form) */
  onForgotten: PropTypes.func.isRequired,
}

Login.defaultProps = {
  email: '',
  className: '',
}
