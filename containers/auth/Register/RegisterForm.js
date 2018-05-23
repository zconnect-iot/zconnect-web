import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField, PasswordField } from '../../../widgets/forms'

import SpinButton from '../components/SpinButton'


const RegisterForm = (props) => {
  const { handleSubmit, pristine, pending, t } = props
  return (
    <form>
      <TextField name="first_name" label={t('firstname')} />
      <TextField name="last_name" label={t('lastname')} />
      <TextField name="email" label={t('email')} />
      <TextField name="email2" label={t('repeatemail')} />
      <PasswordField name="password" label={t('password')} />
      <PasswordField name="password2" label={t('repeatpassword')} />
      <SpinButton
        pending={pending}
        color="primary"
        action={handleSubmit}
        disabled={pristine || pending}
      >
        {t('register').toUpperCase()}
      </SpinButton>
    </form>
  )
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'registerForm',
})(RegisterForm)
