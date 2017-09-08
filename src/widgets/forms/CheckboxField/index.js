import { createFieldComponent } from '../genericInput/index'

const { component, renderInput, classes } = createFieldComponent('checkbox-field', 'checkbox')

export {
  component as default,
  renderInput,
  classes,
}
