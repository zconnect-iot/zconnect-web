import React from 'react'
import PropTypes from 'prop-types'
import { plugins } from 'griddle-react'
import { connect } from 'react-redux'

import './style.scss'

/** Render a list row. */
export const renderRow = ({
  griddleKey,
  rowData,
  columnIds,
  className,
  Cell,
}) => (
  <tr className={className}>
    {columnIds.map(colId => (
      <Cell
        key={colId}
        griddleKey={griddleKey}
        columnId={colId}
        value={rowData[colId]}
      />
    ))}
  </tr>
)
renderRow.propTypes = {
  columnIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string.isRequired,
  Cell: PropTypes.func.isRequired,
  griddleKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
}

/** Default list row component. */
export const Row = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props),
}))(renderRow)

export const components = Object.assign({}, plugins.LocalPlugin.components, {
  Row,
})

export default Object.assign({}, plugins.LocalPlugin, {
  components,
})
