import { createFieldComponent } from '../genericInput/index'

import './style.scss'

const { component, renderInput, classes } = createFieldComponent('EmailField', 'email')

export {
  component as default,
  renderInput,
  classes,
}
