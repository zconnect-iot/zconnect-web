import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField } from '../../../widgets/forms'
import { Button } from '../../../components'

const ForgottenForm = (props) => {
  const { handleSubmit, pristine, submitting, t } = props
  return (
    <form>
      <TextField name="email" label={t('email')} />
      <Button color="primary" action={handleSubmit} disabled={pristine || submitting}>{t('resetpassword').toUpperCase()}</Button>
    </form>
  )
}

ForgottenForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'forgottenForm',
})(ForgottenForm)
