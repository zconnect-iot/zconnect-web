import { withProps, compose } from 'recompose'
import { SimpleButton } from '../../../components'
import { withSpinner } from '../../../hocs'

export default compose(
  withProps({ spinnerSize: 24 }),
  withSpinner(),
)(SimpleButton)
