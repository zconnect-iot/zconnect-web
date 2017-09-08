import React from 'react'
import BEMHelper from 'react-bem-helper'
import { Field } from 'redux-form/immutable'

import genericInput, { propTypes } from '../genericInput/index'

const classes = new BEMHelper('emailfield')

const renderInner = props => genericInput(classes, props)

const EmailField = props => <Field
  type='email'
  component={renderInner}
  {...props}
/>


EmailField.propTypes = propTypes

export {
  renderInner,
  EmailField as default,
}
