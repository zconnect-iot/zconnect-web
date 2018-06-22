import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import { registerUser, registerUserError } from 'zc-core/auth/actions'
import { selectRegisterAPIState, selectRegisterErrorMessage } from 'zc-core/auth/selectors'
import { toJS, withTranslator } from 'zc-core/hocs'

import RegisterComponent from './Register'


const mapStateToProps = state => ({
  api: selectRegisterAPIState(state),
  errorMessage: selectRegisterErrorMessage(state),
})

const mapDispatchToProps = dispatch => ({
  register: payload => dispatch(registerUser(payload)),
  registerError: e => dispatch(registerUserError({ response: { json: { code: e } } })),
})

const ComposedRegister = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
  withTranslator,
)(RegisterComponent)

export default function Register(props) {
  return <ComposedRegister {...props} />
}

Register.propTypes = {
  className: PropTypes.string,
  /** Will pre populate form if passed */
  email: PropTypes.string,
}

Register.defaultProps = {
  email: '',
  className: '',
}
