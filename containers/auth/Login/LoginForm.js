import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField, PasswordField } from '../../../widgets/forms'
import { Button } from '../../../components'

const LoginForm = (props, context) => {
  const { handleSubmit, pristine, submitting } = props
  const { t } = context
  return (
    <form>
      <TextField name="email" label={t('email')} />
      <PasswordField name="password" label={t('password')} />
      <Button color="primary" action={handleSubmit} disabled={pristine || submitting}>{t('login').toUpperCase()}</Button>
    </form>
  )
}

LoginForm.contextTypes = {
  t: PropTypes.func,
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
