import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from 'zc-core/auth/actions' // eslint-disable-line import/extensions
import { selectLoginAPIState, selectLoginErrorMessage } from 'zc-core/auth/selectors' // eslint-disable-line import/extensions
// import { toJS } from 'zc-core/hocs'

import LoginForm from './LoginForm'


// import styles from './styles.scss'
const styles = {}

class Login extends React.Component {
  handleSubmit = (payload) => {
    const { email, password } = payload.toJS()
    this.props.login(email, password)
  }

  render() {
    const { api, errorMessage } = this.props
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit} />
        {api.error && <p className={styles.errorText}>{errorMessage}</p>}
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  api: PropTypes.shape({
    error: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
  errorMessage: PropTypes.string,
}

Login.defaultProps = {
  errorMessage: '',
}

const mapStateToProps = state => ({
  api: selectLoginAPIState(state),
  errorMessage: selectLoginErrorMessage(state),
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
