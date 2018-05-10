import { Map, List } from 'immutable'

export default {
  // Bit of a beast reduction. Tests show input - output shapes
  getSubscriptions: {
    url: 'api/v3/users/${userId}/subscriptions/',
    method: 'GET',
    token: true,
    storeKey: 'subscriptions',
    storeMethod: (last = Map(), next, params) => last.set(
      params.userId,
      next.reduce((subs, sub) => {
        const pathToCategory = [sub.getIn(['organization', 'id']), sub.get('category')]
        return subs.setIn(
          pathToCategory,
          subs.getIn(pathToCategory, Map())
            .set(sub.get('type'), sub.get('id'))
            .set(
              'min_severity',
              subs.getIn([...pathToCategory, 'min_severity'], sub.get('min_severity')),
            ),
        )
      }, Map()),
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
