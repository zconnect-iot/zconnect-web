import { createSelector } from 'reselect'

import { emptyList, emptyMap } from 'zc-core/utils'
import { selectResponse } from 'zc-core/api/selectors'


export const storeKey = 'activities'

const selectDeviceIdFromProps = (_, { deviceId }) => deviceId

const selectStartFromProps = (_, { start }) => start

const selectEndFromProps = (_, { end }) => end

const selectActivities = state => selectResponse(state, { storeKey })

export const selectDataForDevice = createSelector(
  selectActivities,
  selectDeviceIdFromProps,
  selectStartFromProps,
  selectEndFromProps,
  (activities, deviceId, start, end) => (
    activities.getIn(['params', 'deviceId']) === deviceId &&
    activities.getIn(['params', 'start']) === start &&
    activities.getIn(['params', 'end']) === end ? activities : emptyMap
  ),
)

export const selectResults = createSelector(
  selectDataForDevice,
  data => data.get('results', emptyList),
)

export const selectCount = createSelector(
  selectDataForDevice,
  data => data.get('count', 0),
)

export const selectMoreAvailable = createSelector(
  selectResults,
  selectCount,
  (results, count) => results.size < count,
)
