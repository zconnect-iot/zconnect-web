import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form/immutable'
import classNames from 'classnames'

import {
  TextField,
  EmailField,
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
    </div>
  </form>
})

export { PersonalDetails as default }
