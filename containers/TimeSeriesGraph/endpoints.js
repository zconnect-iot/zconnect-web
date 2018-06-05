export default {
  getTimeSeriesData: {
    url: 'api/v3/devices/${deviceId}/data/',
    method: 'GET',
    token: true,
    storeKey: 'tsData',
    storeMethod: (last = Map(), next, params) => last.setIn(
      [params.deviceId, params.resolution],
      next,
    ),
  },
}
