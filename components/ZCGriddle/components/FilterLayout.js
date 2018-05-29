import React from 'react'


const FilterLayout = ({
  Table, Pagination, Filter, className, hidePagination, hideFilter,
}) => (
  <div className={className}>
    {!hideFilter && <div className="griddle__filterBar">
      <Filter />
    </div>}
    <Table />
    {!hidePagination && <Pagination />}
  </div>
)

export default FilterLayout
