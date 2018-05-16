import { storeMethod } from '../AsyncList/utils'

export default {
  getActivities: {
    url: 'api/v3/devices/${deviceId}/activity_stream/',
    method: 'GET',
    token: true,
    storeKey: 'activities',
    storeMethod,
  },
}
