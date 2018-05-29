import React from 'react'

const TableBody = ({
  rowIds, Row, style, className,
}) => (
  <div style={style} className={className}>
    { rowIds && rowIds.map(r => <Row key={r} griddleKey={r} />) }
  </div>
)

export default TableBody
