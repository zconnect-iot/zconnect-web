import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField } from '../../../widgets/forms'

import SpinButton from '../components/SpinButton'


const ForgottenForm = (props) => {
  const { handleSubmit, t, pending } = props
  return (
    <form>
      <TextField name="email" label={t('email')} />
      <SpinButton
        pending={pending}
        color="primary"
        action={handleSubmit}
        disabled={pending}
      >
        {t('resetpassword').toUpperCase()}
      </SpinButton>
    </form>
  )
}

ForgottenForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'forgottenForm',
})(ForgottenForm)
