import { createFieldComponent } from '../genericInput/index'

const { component, renderInput, classes } = createFieldComponent('PasswordField', 'password')

export {
  component as default,
  renderInput,
  classes,
}
