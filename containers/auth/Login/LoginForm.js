import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { zcApiShapeJS } from 'zc-core/utils/propTypes'

import { TextField, PasswordField } from '../../../widgets/forms'

import SpinButton from '../components/SpinButton'


const LoginForm = (props) => {
  const {
    handleSubmit, pristine, t, api,
  } = props
  return (
    <form>
      <TextField name="email" label={t('email')} />
      <PasswordField name="password" label={t('password')} />
      <SpinButton
        pending={api.pending}
        color="primary"
        action={handleSubmit}
        disabled={pristine || api.pending}
      >
        {t('login').toUpperCase()}
      </SpinButton>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  api: zcApiShapeJS.isRequired,
}

export default reduxForm({
  form: 'loginForm',
})(LoginForm)
