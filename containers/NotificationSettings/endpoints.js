import { Map, List } from 'immutable'

export default {
  getSubscriptions: {
    url: 'api/v3/users/${userId}/subscriptions/',
    method: 'GET',
    token: true,
    storeKey: 'subscriptions',
    storeMethod: (last = Map(), next, params) => last.set(
      params.userId,
      next.reduce((subs, sub) => subs.setIn(
        [sub.getIn(['organisation', 'id']), sub.get('category')],
        subs.getIn([sub.getIn(['organisation', 'id']), sub.get('category')], Map)
          .set(sub.get('type'), Map({ id: sub.get('id'), enabled: true }))
          .set('weight', 1) // Implement with counter based on list pos
          .set('min_severity', sub.get('min_severity')), // Take min of this or previous
      ), Map),
    ),
  },
  getSubscription: {
    url: 'api/v3/users/${userId}/subscriptions/${subscriptionId}',
    method: 'GET',
    token: true,
    storeKey: 'subscriptions',
    storeMethod: (last = Map(), next, params) => last.setIn(
      [params.userId, next.getIn(['organisation', 'id']), next.get('category')],
      next,
    ), // TODO: Implement if/when needed
  },
}
