import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { range } from 'lodash'

import { NextButton, PreviousButton } from '../ZCGriddle/components'

/*
  This component only exists because Griddle seems to be blocking updates of the
  events prop so that the paginator buttons aren't working after the first click
  This provides the same functionality and styles as the built in paginator but can
  be rendered anywhere.
  It takes the props provided by withPaginationProps HOC
*/

export default function Pagination(props) {
  const {
    className, currentPage, maxPages, onNext, onPrevious, onGetPage,
  } = props
  return (
    <div className={classnames('List__pagination', className)}>
      <PreviousButton hasPrevious={currentPage > 1} onClick={onPrevious} />
      <select onChange={onGetPage} value={currentPage}>
        {range(1, maxPages + 1).map(i => <option value={i} key={i}>{i}</option>)}
      </select>
      <NextButton hasNext={currentPage < maxPages} onClick={onNext} />
    </div>
  )
}

Pagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onGetPage: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  className: '',
}
