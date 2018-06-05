import { createSelector } from 'reselect'
import { Map } from 'immutable'
import { getFormValues } from 'redux-form/immutable'
import { diff } from 'deep-object-diff'
import { startsWith } from 'lodash'

import { emptyMap, emptyList } from 'zc-core/utils'
import { selectUserId } from 'zc-core/auth/selectors'
import { selectResponse, selectAPIState } from 'zc-core/api/selectors'


export const STORE_KEY = 'subscriptions'

const selectSubscriptions = state => selectResponse(state, { storeKey: STORE_KEY })

export const selectApiState = state => selectAPIState(state, { storeKey: STORE_KEY })

const selectCategoriesFromProps = (_, { categories }) => categories
const selectTypesFromProps = (_, { types }) => types
const selectUserIdFromProps = (_, { userId }) => userId
const selectOrganisationIdFromProps = (_, { organisationId }) => organisationId

const selectSubsForUser = createSelector(
  selectSubscriptions,
  selectUserIdFromProps,
  selectUserId,
  (subs, userId, currentUser) => subs.get(userId || currentUser, emptyList),
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

export const selectCurrentValues = state => getFormValues(STORE_KEY)(state) || emptyMap

export const selectChanges = createSelector(
  selectInitialValues,
  selectCurrentValues,
  (initial, current) => diff(initial, current.toJS()),
)

// Changes to the severity dropdown where no corresponding types are checked
// can be disregarded
const notSeverityChangeWithNoCheckedTypes = (entry, currentValues) => {
  const [key] = entry
  const [category, type] = key.split('_')
  return type !== 'severity' || Object
    .entries(currentValues)
    .filter(([change, checked]) =>
      checked !== null && checked !== false && startsWith(change, category))
    .length > 1
}

// This filters out checkboxes that have been toggled false -> true -> null.
// See comment in components/ValueCheckbox.js for explanation
const notFalseToNullChange = ([key, value], initialValues) =>
  !(value === null && initialValues[key] === false)

export const selectChangesRequiringAction = createSelector(
  selectChanges,
  selectCurrentValues,
  selectInitialValues,
  (changes, current, initial) => Object.entries(changes)
    .filter(entry => (
      notSeverityChangeWithNoCheckedTypes(entry, current.toJS()) &&
      notFalseToNullChange(entry, initial)
    )),
)

export const selectIsDirty = createSelector(
  selectChangesRequiringAction,
  changes => changes.length,
)

// The POST, PATCH and DELETE requests are all wrapped in a batch request
export const selectBatchApiState = state => selectAPIState(state, { storeKey: 'subscriptionsBatch' })
