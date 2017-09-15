import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from 'zc-core/auth/actions'
import { selectLoginAPIState } from 'zc-core/auth/selectors'

import LoginForm from './LoginForm'


// import styles from './styles.scss'
const styles = {}

class Login extends React.Component {
  handleSubmit = (payload) => {
    const { email, password } = payload.toJS()
    this.props.login(email, password)
  }

  render() {
    const { api } = this.props
    return (
      <div>
        <LoginForm onSubmit={this.handleSubmit} />
        {api.error && <p className={styles.errorText}>{api.status}</p>}
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  api: PropTypes.shape({
    error: PropTypes.string,
    status: PropTypes.string.isRequired,
  }),
}

const mapStateToProps = state => ({
  api: selectLoginAPIState(state),
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
