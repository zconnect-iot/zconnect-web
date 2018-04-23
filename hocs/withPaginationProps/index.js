/*
  Takes react router location and history props to provide currentPage, pageSize,
  maxPages and events props for use by AsyncList.
  TODO: Add sorting and filtering when implemented on back end
*/
import { connect } from 'react-redux'
import { compose, mapProps, withStateHandlers } from 'recompose'
import qs from 'query-string'

import { selectMaxPages } from '../../containers/AsyncList/selectors'


export default function withPaginationProps({ storeKey }) {
  return compose(
    mapProps(
      ({ location, history, ...props }) => {
        const convertToUrl = params => `${location.pathname}?${qs.stringify(params)}`
        const { push } = history
        const params = qs.parse(location.search)
        const { currentPage = 1 } = params
        let { pageSize = 10 } = params
        if (+pageSize > 100) pageSize = 100
        return {
          currentPage: +currentPage,
          pageSize: +pageSize,
          onGetPage: ({ target }) => push(convertToUrl({ pageSize, currentPage: +target.value })),
          onNext: () => push(convertToUrl({ pageSize, currentPage: +currentPage + 1 })),
          onPrevious: () => push(convertToUrl({ pageSize, currentPage: +currentPage - 1 })),
          ...props,
        }
      },
    ),
    connect(
      (state, { pageSize, currentPage }) => ({
        maxPages: Math.max(
          selectMaxPages(state, { storeKey, pageSize }), // Will be 1 if no results yet
          currentPage,
        ),
      }),
    ),
  )
}
