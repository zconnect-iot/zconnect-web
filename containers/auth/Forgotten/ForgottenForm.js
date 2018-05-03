import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { TextField } from '../../../widgets/forms'
import { SimpleButton } from '../../../components'

const ForgottenForm = (props) => {
  const { handleSubmit, submitting, t } = props
  return (
    <form>
      <TextField name="email" label={t('email')} />
      <SimpleButton
        color="primary"
        action={handleSubmit}
        disabled={submitting}
      >
        {t('resetpassword').toUpperCase()}
      </SimpleButton>
    </form>
  )
}

ForgottenForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'forgottenForm',
})(ForgottenForm)
