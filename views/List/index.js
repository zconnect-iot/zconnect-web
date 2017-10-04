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
}
List.defaultProps = {
  components: null,
}

export default List
