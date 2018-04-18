import React from 'react'


const FilterLayout = ({ Table, Pagination, Filter, className }) => (
  <div className={className}>
    <div className="griddle__filterBar">
      <Filter />
    </div>
    <Table />
    <Pagination />
  </div>
)

export default FilterLayout
