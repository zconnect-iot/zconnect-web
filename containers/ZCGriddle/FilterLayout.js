import React from 'react'


const FilterLayout = ({ Table, Pagination, Filter, title, className }) => (
  <div className={className}>
    <div className="griddle__filterBar">
      {title && <h2>{title}</h2>}
      <Filter />
    </div>
    <Table />
    <Pagination />
  </div>
)

export default FilterLayout
