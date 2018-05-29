/*
  AsyncListWithState maintains pageProperties for AsyncList in state and provides
  the events prop to over ride the functions triggered when using the griddle to
  change that state.

  Required props:
    endpoint - the name of the endpoint config which should use the storeMethod in utils
    storeKey - the storeKey defined inside the endpoint config

  All other props and children are passed down to ZCGriddle and into the underlying
  Griddle which means it exports the same api as a standard Griddle

  Filter and sort aren't implemneted on back or front end yet but are there as
  placeholders
*/

import { compose, mapProps, withStateHandlers } from 'recompose'

import AsyncList from '../AsyncList'

const getInitialState = ({
  currentPage = 1,
  pageSize = 10,
  filter = '',
  sort = { id: 'id', ascending: true },
}) => ({
  currentPage,
  filter,
  sort,
  pageSize,
})

const stateHandlers = {
  onNext: ({ currentPage }) => () => ({
    currentPage: currentPage + 1,
  }),
  onPrevious: ({ currentPage }) => () => ({
    currentPage: currentPage - 1,
  }),
  onGetPage: () => currentPage => ({
    currentPage,
  }),
  onFilter: () => filter => ({
    filter,
  }),
  onSort: ({ sort }) => id => ({
    sort: { id, ascending: sort.id === id ? !sort.ascending : true },
  }),
}

export default compose(
  withStateHandlers(
    getInitialState,
    stateHandlers,
  ),
  mapProps(
    ({ onNext, onPrevious, onGetPage, onSort, onFilter, ...props }) => ({
      ...props,
      events: {
        onNext,
        onPrevious,
        onGetPage,
        onSort,
        onFilter,
      },
    }),
  ),
)(AsyncList)
