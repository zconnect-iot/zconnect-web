/*
  Required props:
    categories - list of available categories
    severities - list of label:min_severity tuples (in order displayed in dropdown)
      [['Important', 30], ['Some', 20]]
    types - list of possible notification type label:key tuples (in order of columns)
      [['SMS', 'sms'], ['E-mail', 'email']]
  Optional props:
    userId - if not provided the current logged in users id will be used
*/

import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectUserId } from 'zc-core/auth/selectors'

import {
  selectCategories,
  selectErrorMessage,
  selectApiState,
} from './selectors'
import NotificationSettings from './NotificationSettings'

const mapStateToProps = (state, props) => ({
  initialState: selectCategories(state, props),
  // errorMessage: selectErrorMessage(state, props),
  api: selectApiState(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  fetchSubs: () => dispatch(apiRequest(
    'getSubscriptions',
    { userId: props.userId || selectUserId },
  )),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJS(NotificationSettings))
