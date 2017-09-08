import React from 'react'
import { reduxForm } from 'redux-form'

import { TextField } from '../../../widgets/forms/index'

/**
 * The PersonalDetails form.
 */
const PersonalDetails = reduxForm({
  form: 'personalDetails',
})(({handleSubmit}) => {
  return <form onSubmit={handleSubmit} className='personal-details'>
    <TextField name='first-name' label='First name' />
  </form>
})

export { PersonalDetails as default }
