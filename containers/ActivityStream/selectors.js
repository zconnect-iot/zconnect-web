import { createSelector } from 'reselect'

import { emptyList } from 'zc-core/utils'
import { selectResponse } from 'zc-core/api/selectors'


export const storeKey = 'activities'

const selectDeviceIdFromProps = (_, { deviceId }) => deviceId

const selectDevices = state => selectResponse(state, { storeKey })

export const selectDataForDevice = createSelector(
  selectDevices,
  selectDeviceIdFromProps,
  (devices, deviceId) => devices.get(deviceId, emptyList),
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
