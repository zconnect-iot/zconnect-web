import React from 'react'
import PropTypes from 'prop-types'
import Griddle, { RowDefinition, ColumnDefinition } from 'griddle-react'

import { camelToTitleCase } from '../../util/string'

import listPlugin from './GriddlePlugin'

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
 *
 * Uses the Griddle plugin defined at {@link ./GriddlePlugin.js} to define
 * components.
 */
const List = props => (
  <Griddle
    plugins={[listPlugin]}
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
  className: PropTypes.string,
}
List.defaultProps = {
  components: null,
  className: '',
}

export default List

/* eslint-disable react/no-unused-prop-types */
/**
 * A basic layout component, for convenience.
 *
 * Renders only the table (no filtering, pagination or settings).
 */
export const BasicLayout = props => <props.Table />
BasicLayout.propTypes = {
  Table: PropTypes.func.isRequired,
}
/* eslint-enable react/no-unused-prop-types */
