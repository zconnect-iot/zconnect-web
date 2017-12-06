import { connect } from 'react-redux'

const rowDataSelector = (state, { griddleKey }) => state
  .get('data')
  .find(rowMap => rowMap.get('griddleKey') === griddleKey)
  .toJSON()

const withRowData = () => connect((state, props) => ({
  rowData: rowDataSelector(state, props),
}))

export default withRowData
