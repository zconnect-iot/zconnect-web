import { createSelector } from 'reselect'
import { Map, List } from 'immutable'

const emptyMap = Map()
const emptyList = List()

const selectStoreKeyFromProps = (_, { storeKey }) => storeKey

const selectPageSizeFromProps = (_, { pageSize }) => pageSize || 10

const selectCurrentPageFromProps = (_, { currentPage }) => currentPage || 1

const selectApiDomain = state => state.get('api')

const selectRequest = createSelector(
  selectApiDomain,
  selectStoreKeyFromProps,
  (api, storeKey) => api.get(storeKey, emptyMap),
)

const selectResponse = createSelector(
  selectRequest,
  request => request.get('response', emptyMap),
)

const selectErrorResponse = createSelector(
  selectRequest,
  request => request.getIn(['error', 'response'], emptyMap),
)

export const selectErrorMessage = createSelector(
  selectErrorResponse,
  error => error.getIn(['json', 'detail'], 'An unknown fetch error occurred'),
)

const selectLastResponse = createSelector(
  selectResponse,
  response => response.get('lastResponse', emptyMap),
)

export const selectRecordCount = createSelector(
  selectLastResponse,
  response => response.get('count', 0),
)

// Utility selector not used by default as Griddle generates max pages automatically
// from the pageProperties
export const selectMaxPages = createSelector(
  selectRecordCount,
  selectPageSizeFromProps,
  (records, pageSize) => Math.ceil(records / pageSize),
)

export const selectResults = createSelector(
  selectLastResponse,
  response => response.get('results', emptyList),
)

// Returns the pageProperties object required by Griddle when externally controlled
export const selectPageProperties = createSelector(
  selectRecordCount,
  selectPageSizeFromProps,
  selectCurrentPageFromProps,
  (recordCount, pageSize, currentPage) => ({
    recordCount,
    currentPage,
    pageSize,
  }),
)
