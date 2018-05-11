import { Map, List } from 'immutable'

export default {
  getSubscriptions: {
    url: 'api/v3/users/${userId}/subscriptions/',
    method: 'GET',
    token: true,
    storeKey: 'subscriptions',
    storeMethod: (last = Map(), next, params) => last.set(
      params.userId,
      next.get('results'),
    ),
  },
  postSubscription: {
    url: 'api/v3/users/${userId}/subscriptions/',
    method: 'POST',
    token: true,
    storeKey: 'subscriptions',
    storeMethod: (last = Map(), next, params) => last.setIn(
      params.userId,
      last.get(params.userId).push(next),
    ),
  },
  deleteSubscription: {
    url: 'api/v3/users/${userId}/subscriptions/${subscriptionId}/',
    method: 'DELETE',
    token: true,
    storeKey: 'subscriptions',
    storeMethod: (last = Map(), next, params) => last,
    // TODO: delete the subscription
  },
}
