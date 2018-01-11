import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logout } from 'zc-core/auth/actions'
import { selectUserLoggedIn } from 'zc-core/auth/selectors'
import { Modal } from '../../views'
import { SimpleLink } from '../../components'


function ErrorHandler({ retry, logoutUser, loggedIn, error }) {
  return (
    <Modal title="Something went wrong" onClose={retry}>
      <p>
        Overlock encountered an error. Click <SimpleLink action={retry}>here</SimpleLink> to try again.
        {"If that doesn't work try reloading your browser."}
      </p>
      {loggedIn && <p>Alternatively, <SimpleLink action={logoutUser}>log out</SimpleLink> and try again.</p>}
      <br />
      <h5>Error details:</h5>
      <p>{error.name}</p>
      <p>{error.message}</p>
    </Modal>
  )
}

ErrorHandler.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  loggedIn: selectUserLoggedIn(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  logoutUser: () => {
    dispatch(logout())
    props.retry()
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler)
