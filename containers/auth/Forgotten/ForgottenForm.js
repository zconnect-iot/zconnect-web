import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField } from '../../../widgets/forms'
import { Button } from '../../../components'

const ForgottenForm = (props, context) => {
  const { handleSubmit, pristine, submitting } = props
  const { t } = context
  return (
    <form>
      <TextField name="email" label={t('email')} />
      <Button color="primary" action={handleSubmit} disabled={pristine || submitting}>{t('resetpassword').toUpperCase()}</Button>
    </form>
  )
}

ForgottenForm.contextTypes = {
  t: PropTypes.func,
}

ForgottenForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'forgottenForm',
})(ForgottenForm)
