import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField, PasswordField } from '../../../widgets/forms'
import { Button, Spinner } from '../../../components'

const RegisterForm = (props, context) => {
  const { handleSubmit, pristine, submitting, pending } = props
  const { t } = context
  return (
    <form>
      <TextField name="fname" label={t('firstname')} />
      <TextField name="lname" label={t('lastname')} />
      <TextField name="email" label={t('email')} />
      <TextField name="email2" label={t('repeatemail')} />
      <PasswordField name="password" label={t('password')} />
      <PasswordField name="password2" label={t('repeatpassword')} />
      <Button color="primary" action={handleSubmit} disabled={pristine || submitting || pending}>
        {pending ? <Spinner /> : t('register').toUpperCase()}
      </Button>
    </form>
  )
}

RegisterForm.contextTypes = {
  t: PropTypes.func,
}

RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'registerForm',
})(RegisterForm)
