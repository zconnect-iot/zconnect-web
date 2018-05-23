import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'

import { emptyMap } from 'zc-core/utils'
import { selectUserId } from 'zc-core/auth/selectors'
import { selectResponse, selectAPIState } from 'zc-core/api/selectors'


export const STORE_KEY = 'subscriptions'

const selectSubscriptions = state => selectResponse(state, { storeKey: STORE_KEY })

export const selectApiState = state => selectAPIState(state, { storeKey: STORE_KEY })

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

// This converts the list of subscriptions to a map keyed by orgId -> category -> <TYPE>
// Taking the severity value of the first subscription type for each category
// And setting the notification type value to the id of the subscription so it
// can be easily PATCH'ed in the container
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

// Currently the this component renders the notification settings for a single org
// as determined by organisationId prop. Subs for other orgs will be ignored.
const selectSubsForOrg = createSelector(
  selectSubsByOrg,
  selectOrganisationIdFromProps,
  (orgs, orgId) => orgs.get(orgId, emptyMap),
)

// This takes the lists of possible categories and notification types from the props
// and the current subscriptions received for the user to produce the redux form
// initialValues prop. A map of [CATEGORY_TYPE]: VALUE pairs which corresponds to
// the field names generated from the same props during the rendering of the form
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

// The POST, PATCH and DELETE requests are all wrapped in a batch request
export const selectBatchApiState = state => selectAPIState(state, { storeKey: 'subscriptionsBatch' })
