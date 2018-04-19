import { createSelector } from 'reselect'
import { Map, List } from 'immutable'

const emptyMap = Map()
const emptyList = List()

const selectStoreKeyFromProps = (_, { storeKey }) => storeKey

const selectPageSizeFromProps = (_, { pageSize }) => pageSize

const selectCurrentPageFromProps = (_, { currentPage }) => currentPage

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

const selectLastResponse = createSelector(
  selectResponse,
  response => response.get('lastResponse', emptyMap),
)

export const selectRecordCount = createSelector(
  selectLastResponse,
  response => response.get('count', 0),
)

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
