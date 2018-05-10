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
const selectUserIdFromProps = (_, { userId }) => userId

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

// TODO: Add compatibility for multiple orgs when required. Currently just taking
// the first and only org stored for the user
const selectSubsForOrg = createSelector(
  selectSubsForUser,
  user => user.get(user.keySeq().first()),
)

export const selectCategories = createSelector(
  selectSubsForOrg,
  selectCategoriesFromProps,
  (subs, categories) => categories.map(category => ({
    title: capitalize(category),
    ...subs.get(category, emptyMap).toJS(),
  })),
)
