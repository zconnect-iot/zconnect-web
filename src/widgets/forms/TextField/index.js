import React from 'react'
import BEMHelper from 'react-bem-helper'
import { Field } from 'redux-form/immutable'

import genericInput, { propTypes } from '../genericInput/index'

const classes = new BEMHelper('textfield')

const renderInner = props => genericInput(classes, props)

const TextField = props => <Field
  type='text'
  component={renderInner}
  {...props}
/>

TextField.propTypes = propTypes

export {
  renderInner,
  TextField as default,
}
