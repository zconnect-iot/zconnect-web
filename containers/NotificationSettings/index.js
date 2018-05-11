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
import { getFormValues } from 'redux-form/immutable'
import { diff } from 'deep-object-diff'
import { Map } from 'immutable'

import { toJS } from 'zc-core/hocs'
import { apiRequest } from 'zc-core/api/actions'
import { selectUserId } from 'zc-core/auth/selectors'

import {
  selectInitialValues,
  selectErrorMessage,
  selectApiState,
} from './selectors'
import NotificationSettings from './NotificationSettings'

const emptyMap = Map()

const mapStateToProps = (state, props) => ({
  initialValues: selectInitialValues(state, props),
  currentValues: getFormValues('subscriptions')(state) || emptyMap,
  // errorMessage: selectErrorMessage(state, props),
  api: selectApiState(state, props),
})

const mapDispatchToProps = (dispatch, props) => ({
  fetchSubs: () => dispatch(apiRequest(
    'getSubscriptions',
    { userId: props.userId || selectUserId },
  )),
  createSub: sub => dispatch(apiRequest(
    'postSubscription',
    { userId: props.userId || selectUserId },
    sub,
  )),
  deleteSub: subscriptionId => dispatch(apiRequest(
    'deleteSubscription',
    {
      userId: props.userId || selectUserId,
      subscriptionId,
    },
  )),
  editSub: (subscriptionId, patch) => dispatch(apiRequest(
    'editSubscription',
    {
      userId: props.userId || selectUserId,
      subscriptionId,
    },
    patch,
  )),
})

const mergeProps = (state, dispatch, props) => ({
  ...state,
  ...props,
  fetchSubs: dispatch.fetchSubs,
  submitForm: () => {
    const currentValues = state.currentValues.toJS()
    const changes = diff(state.initialValues, currentValues)
    console.log(changes);
    Object.entries(changes).forEach(([field, value]) => {
      const [category, type] = field.split('_')

      // Create newly checked notification types
      if (value === true) dispatch.createSub({
        organisation: { // TODO: Get from prop or selector
          id: '2',
          name: 'My cool Organization'
        },
        category,
        min_severity: currentValues[`${category}_severity`],
        type,
      })

      // Delete unchecked notification types
      if (value === false) dispatch.deleteSub(state.initialValues[field])

      // Edit any enabled notification types with the updated severity
      if (type === 'severity') Object.entries(currentValues)
        // If the value is a string it's a previously enabled subscription type
        // and the value is the sub id
        .filter(([, val]) => typeof val === 'string')
        .forEach(([, id]) => dispatch.editSub(
          id,
          {
            min_severity: value,
          },
        ))
    })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(toJS(NotificationSettings))
