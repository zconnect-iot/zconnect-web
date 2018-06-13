import { createFieldComponent } from '../genericInput/index'

import './style.scss'

const { component, renderInput, classes } = createFieldComponent('PasswordField', 'password')

export {
  component as default,
  renderInput,
  classes,
}
