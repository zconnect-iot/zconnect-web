import React from 'react'
import PropTypes from 'prop-types'
import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from 'griddle-react'
import { connect } from 'react-redux'
import stylePropType from 'react-style-proptype'

import { camelToTitleCase } from '../../util/string'

import './style.scss'

/** Render a list row. */
export const renderRow = ({ rowData, columnIds, className }) => (
  <tr className={className}>
    {columnIds.map(colId => (
      <td
        key={colId}
        className="griddle-cell"
      >
        {rowData[colId]}
      </td>
    ))}
  </tr>
)
renderRow.propTypes = {
  columnIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string.isRequired,
}

/** Default list row component. */
export const defaultRow = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props),
}))(renderRow)

/** Default list table component. */
export const ListTable = () => {
  const CustomTable = (props, context) => <context.components.TableBody />
  CustomTable.contextTypes = {
    components: React.PropTypes.object,
  }
  return CustomTable
}

/** Default list table body component. */
export const ListTableBody = ({ rowIds, Row, style, className }) => (
  <div style={style} className={className}>
    {rowIds && rowIds.map(r => <Row key={r} griddleKey={r} />)}
  </div>
)
ListTableBody.propTypes = {
  rowIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  Row: PropTypes.func.isRequired,
  style: stylePropType,
  className: PropTypes.string.isRequired,
}
ListTableBody.defaultProps = {
  style: null,
}

/** Default layout component. */
export const defaultLayout = ({ Table }) => <Table />
defaultLayout.propTypes = {
  Table: PropTypes.func.isRequired,
}

export const defaultComponents = {
  Layout: defaultLayout,
  Row: defaultRow,
  Table: ListTable,
  TableBody: ListTableBody,
}

export const defineColumn = (col) => {
  if (typeof col !== 'string')
    return col
  return (
    <ColumnDefinition
      key={col}
      id={col}
      title={camelToTitleCase(col)}
    />
  )
}

/**
 * List view.
 *
 * @param {(string|node)[]} props.columns a list of column IDs or definitions.
 * @param {Object} props.components a dict of components (see Griddle docs).
 */
const List = props => (
  <Griddle
    plugins={[plugins.LocalPlugin]}
    components={Object.assign({}, defaultComponents, props.components)}
    {...props}
  >
    {props.columns && (
      <RowDefinition>
        {props.columns.map(defineColumn)}
      </RowDefinition>
    )}
  </Griddle>
)
List.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ])).isRequired,
  components: PropTypes.shape({
    Layout: PropTypes.func,
    Row: PropTypes.func,
  }),
}
List.defaultProps = {
  components: null,
}

export default List
