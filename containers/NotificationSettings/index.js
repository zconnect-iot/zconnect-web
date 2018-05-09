/*
  Required props:
    categories - list of available categories
*/

import { connect } from 'react-redux'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectUserId } from 'zc-core/auth/selectors'

import NotificationSettings from './NotificationSettings'

// const mapStateToProps = (state, props) => ({
//   data: selectResults(state, props),
//   errorMessage: selectErrorMessage(state, props),
//   api: selectAPIState(state, props),
//   pageProperties: selectPageProperties(state, props),
// })

const mapDispatchToProps = (dispatch, props) => ({
  fetchSubs: () => dispatch(apiRequest(
    'getSubscriptions',
    { userId: props.userId || selectUserId },
  )),
})

/*
  This filters out some props that don't need to be passed down to AsyncList / ZCGriddle
  or are otherwise already being passed down wrapped in pageProperties
*/

// const mergeProps = (
//   state,
//   dispatch,
//   { currentPage, pageSize, storeKey, endpoint, ...props },
// ) => ({
//   ...state,
//   ...dispatch,
//   ...props,
// })

export default connect(
  // mapStateToProps,
  mapDispatchToProps,
  // mergeProps,
)(toJS(NotificationSettings))
