import { createFieldComponent } from '../genericInput/index'

import './style.scss'

const { component, renderInput, classes } = createFieldComponent('TextField', 'text')

export {
  component as default,
  renderInput,
  classes,
}
