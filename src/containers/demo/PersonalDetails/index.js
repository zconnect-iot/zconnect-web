import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form/immutable'

import { TextField } from '../../../widgets/forms/index'

let PersonalDetails = reduxForm({
  form: 'personalDetails',
})(({handleSubmit}) => {
  return <form onSubmit={handleSubmit} className='personal-details'>
    <TextField name='firstName' label='First name' value='Name' />
  </form>
})

export { PersonalDetails as default }
