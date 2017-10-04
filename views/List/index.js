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

export const ListRow = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props),
}))(renderRow)

export const ListTable = () => {
  const CustomTable = (props, context) => <context.components.TableBody />
  CustomTable.contextTypes = {
    components: React.PropTypes.object,
  }
  return CustomTable
}

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

export const defaultComponents = {
  Row: ListRow,
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

const List = (props) => {
  const components = Object.assign({}, defaultComponents, props.components)
  return (
    <Griddle
      plugins={[plugins.LocalPlugin]}
      components={components}
      {...props}
    >
      {props.columns && (
        <RowDefinition>
          {props.columns.map(defineColumn)}
        </RowDefinition>
      )}
    </Griddle>
  )
}

List.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ])).isRequired,
  components: PropTypes.shape({
  }),
}

List.defaultProps = {
  components: null,
}

export default List
