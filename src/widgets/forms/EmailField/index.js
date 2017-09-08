import { createFieldComponent } from '../genericInput/index'

const { component, renderInput, classes } = createFieldComponent('email-field', 'email')

export {
  component as default,
  renderInput,
  classes,
}
