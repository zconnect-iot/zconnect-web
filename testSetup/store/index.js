import configureStore from 'redux-mock-store'
import { fromJS } from 'immutable'

// Provides the essential state shape expected by the zc-core selectors
export const mockState = fromJS({
  auth: {
    userId: 'USER_ID',
  },
  api: {
  },
  form: {
    subscriptions: {

    },
  },
  locale: {
    code: 'en',
  },
})

export default configureStore()(mockState)
