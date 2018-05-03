import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { PasswordField } from '../../../widgets/forms'
import { SimpleButton, Spinner } from '../../../components'

const PasswordConfirmForm = (props) => {
  const { handleSubmit, pristine, submitting, pending, t } = props
  return (
    <form>
      <PasswordField name="new_password1" label={t('password')} />
      <PasswordField name="new_password2" label={t('repeatpassword')} />
      <SimpleButton color="primary" action={handleSubmit} disabled={pristine || submitting || pending}>
        {pending ? <Spinner /> : t('resetpassword').toUpperCase()}
      </SimpleButton>
    </form>
  )
}

PasswordConfirmForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'resetPasswordConfirmForm',
})(PasswordConfirmForm)
