import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'

import { PasswordField } from '../../../widgets/forms'

import SpinButton from '../components/SpinButton'


const PasswordConfirmForm = (props) => {
  const { handleSubmit, pristine, pending, t } = props
  return (
    <form>
      <PasswordField name="new_password1" label={t('password')} />
      <PasswordField name="new_password2" label={t('repeatpassword')} />
      <SpinButton
        pending={pending}
        color="primary"
        action={handleSubmit}
        disabled={pristine || pending}
      >
        {t('resetpassword').toUpperCase()}
      </SpinButton>
    </form>
  )
}

PasswordConfirmForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  pending: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'resetPasswordConfirmForm',
})(PasswordConfirmForm)
