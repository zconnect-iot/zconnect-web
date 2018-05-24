/*
  Only one list of activities per
*/

export default {
  getActivities: {
    url: 'api/v3/devices/${deviceId}/activity_stream/',
    method: 'GET',
    token: true,
    storeKey: 'activities',
    storeMethod: (last = Map(), next, params) => {
      if (params.page === 1) return last.set(params.deviceId, next)
      return last
        .setIn(
          [params.deviceId, 'results'],
          last.getIn([params.deviceId, 'results']).concat(next.get('results')),
        )
    },
  },
}
