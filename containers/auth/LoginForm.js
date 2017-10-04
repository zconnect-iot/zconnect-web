import React from 'react'
import { reduxForm } from 'redux-form/immutable'

import { TextField, PasswordField } from '../../widgets/forms'
import { Button } from '../../components'

const LoginForm = (props) => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <form>
      <TextField name="email" label="E-mail" />
      <PasswordField name="password" label="Password" />
      <Button color="primary" action={handleSubmit} disabled={pristine || submitting}>LOG IN</Button>
    </form>
  )
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
