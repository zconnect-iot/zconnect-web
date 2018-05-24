import { fromJS } from 'immutable'

/*
  Only stores a single list of activities with a reference to the params used in the
  last fetch so that the results list can be appended to if the params match or replaced
  if they don't.
*/

export default {
  getActivities: {
    url: 'api/v3/devices/${deviceId}/activity_stream/',
    method: 'GET',
    token: true,
    storeKey: 'activities',
    storeMethod: (last = Map(), next, params) => {
      if (params.page === 1 ||
        params.start !== last.getIn(['params', 'start']) ||
        params.end !== last.getIn(['params', 'end'])) return next.set('params', fromJS(params))
      return last
        .set('results', last.get('results').concat(next.get('results')))
        .set('params', fromJS(params))
    },
  },
}
