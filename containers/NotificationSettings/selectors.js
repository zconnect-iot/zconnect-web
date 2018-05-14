import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import { capitalize } from 'lodash'

import { selectUserId } from 'zc-core/auth/selectors'
import { selectResponse, selectAPIState } from 'zc-core/api/selectors'

const emptyMap = Map()

const storeKey = 'subscriptions'

const selectSubscriptions = state => selectResponse(state, { storeKey })

export const selectApiState = state => selectAPIState(state, { storeKey })

const selectCategoriesFromProps = (_, { categories }) => categories
const selectTypesFromProps = (_, { types }) => types
const selectUserIdFromProps = (_, { userId }) => userId
const selectOrganisationIdFromProps = (_, { organisationId }) => organisationId

// Placeholder used just prevent selector errors when no data has been fetched
const defaultUserOrg = fromJS({
  ORG: {},
})

const selectSubsForUser = createSelector(
  selectSubscriptions,
  selectUserIdFromProps,
  selectUserId,
  (subs, userId, currentUser) => subs.get(userId || currentUser, defaultUserOrg),
)

// Bit of a beast reduction. Tests show input - output shapes
export const selectSubsByOrg = createSelector(
  selectSubsForUser,
  subscriptions => subscriptions.reduce((subs, sub) => {
    const pathToCategory = [sub.getIn(['organization', 'id']), sub.get('category')]
    return subs.setIn(
      pathToCategory,
      subs.getIn(pathToCategory, Map())
        .set(sub.get('type'), sub.get('id'))
        .set(
          'severity',
          subs.getIn([...pathToCategory, 'severity'], sub.get('min_severity')),
        ),
    )
  }, emptyMap),
)

// TODO: Add compatibility for multiple orgs when required. Currently just taking
// the orgId passed as prop or the first and only org stored for the user
const selectSubsForOrg = createSelector(
  selectSubsByOrg,
  selectOrganisationIdFromProps,
  (orgs, orgId) => orgs.get(orgId, emptyMap),
)

export const selectInitialValues = createSelector(
  selectSubsForOrg,
  selectCategoriesFromProps,
  selectTypesFromProps,
  (subsByCategory, categories, types) => categories.reduce((initial, category) => {
    const subsForCategory = subsByCategory.get(category, emptyMap).toJS()
    const next = { ...initial }
    next[`${category}_severity`] = subsForCategory.severity || 0
    types.forEach(([, type]) => {
      next[`${category}_${type}`] = subsForCategory[type] || false
    })
    return next
  }, {}),
)
