import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField, PasswordField } from '../../../widgets/forms'
import { Button } from '../../../components'

const LoginForm = (props) => {
  const { handleSubmit, pristine, submitting, t } = props
  return (
    <form>
      <TextField name="email" label={t('email')} />
      <PasswordField name="password" label={t('password')} />
      <Button color="primary" action={handleSubmit} disabled={pristine || submitting}>
        {t('login').toUpperCase()}
      </Button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
