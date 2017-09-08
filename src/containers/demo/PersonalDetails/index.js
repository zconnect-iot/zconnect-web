import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form/immutable'
import classNames from 'classnames'

import {
  TextField,
  EmailField,
  PasswordField,
  CheckboxField,
} from '../../../widgets/forms/index'

import styles from './style.scss'

let PersonalDetails = reduxForm({
  form: 'personalDetails',
})(({handleSubmit}) => {
  return <form
    onSubmit={handleSubmit}
    className={classNames('personal-details', styles.form)}
  >
    <div className={styles.formHeader}>Personal details</div>
    <div className={styles.formBody}>
      <TextField name='firstName' label='First name' />
      <EmailField
        name='email'
        label='Email address'
        placeholder='johnsmith@email.com'
      />
      <PasswordField name='password' label='Password' placeholder='******' />
      <CheckboxField name='keepUpdated' label='Keep me up-to-date' />
    </div>
  </form>
})

export { PersonalDetails as default }
