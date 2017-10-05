import React from 'react'
import PropTypes from 'prop-types'
import { plugins } from 'griddle-react'
import { connect } from 'react-redux'
import stylePropType from 'react-style-proptype'
import BEMHelper from 'react-bem-helper'
import { List as ImmutableList } from 'immutable'

import './style.scss'

const classes = new BEMHelper('List')

/** Render a list row. */
export const renderRow = ({
  griddleKey,
  rowData,
  columnIds,
  className,
  Cell,
}) => (
  <tr {...classes('row', null, className)}>
    {columnIds.map(colId => (
      <Cell
        key={colId}
        griddleKey={griddleKey}
        columnId={colId}
        value={rowData[colId]}
        {...classes('cell', null, 'griddle-cell')}
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

/** Default list table component. */
export const Table = () => {
  const CustomTable = (props, context) => (
    <context.components.TableBody
      {...classes('table')}
    />
  )
  CustomTable.contextTypes = {
    components: React.PropTypes.object,
  }
  return CustomTable
}

/** Default list table body component. */
export const TableBody = ({ rowIds, Row: TRow, style, className }) => (
  <tbody style={style} {...classes('table-body', null, className)}>
    {rowIds && rowIds.map(rowId => <TRow key={rowId} griddleKey={rowId} />)}
  </tbody>
)
TableBody.propTypes = {
  rowIds: PropTypes.instanceOf(ImmutableList).isRequired,
  Row: PropTypes.func.isRequired,
  style: stylePropType,
  className: PropTypes.string.isRequired,
}
TableBody.defaultProps = {
  style: null,
}

export const components = {
  Row,
  TableBody,
}

export default Object.assign({}, plugins.LocalPlugin, {
  components,
})
