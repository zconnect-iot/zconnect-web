/*
  Required props:
    organisationId
    categories - list of available categories
    severities - list of label:min_severity tuples (in order displayed in dropdown)
      [['Important', 30], ['Some', 20]]
    types - list of possible notification type label:key tuples (in order of columns)
      [['SMS', 'sms'], ['E-mail', 'email']]
  Optional props:
    userId - if not provided the current logged in users id will be used
*/
import { connect } from 'react-redux'
import { getFormValues, reduxForm } from 'redux-form/immutable'
import { diff } from 'deep-object-diff'
import { startsWith } from 'lodash'
import { compose } from 'recompose'

import { toJS } from 'zc-core/hocs'
import { emptyMap } from 'zc-core/utils'
import { apiRequest } from 'zc-core/api/actions'
import { selectErrorMessage } from 'zc-core/api/selectors'
import { selectUserId } from 'zc-core/auth/selectors'

import { selectInitialValues, selectApiState, STORE_KEY } from './selectors'
import NotificationSettings from './NotificationSettings'


const mapStateToProps = (state, props) => ({
  initialValues: selectInitialValues(state, props),
  currentValues: getFormValues(STORE_KEY)(state) || emptyMap,
  errorMessage: selectErrorMessage(state, { storeKey: STORE_KEY }),
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

const mergeProps = (state, dispatch, props) => {
  const currentValues = state.currentValues.toJS()
  const changes = diff(state.initialValues, currentValues)
  return {
    ...state,
    ...props,
    // We need a custom dirty state selector here to ignore changes to severity
    // dropdown if there are no checked notification types for that category
    isDirty: Object.entries(changes)
      .filter(([key]) => {
        const [category, type] = key.split('_')
        return type !== 'severity' || Object
          .entries(currentValues)
          .filter(([change, checked]) =>
            checked !== null && checked !== false && startsWith(change, category))
          .length > 1
      })
      // And also ignore any unchecked types that were previously false and now null
      // .filter(([key, value]) => value !== null || state.initialValues[key] !== false)
      .length > 0,
    fetchSubs: dispatch.fetchSubs,
    submitForm: () => Object.entries(changes).forEach(([field, value]) => {
      const [category, type] = field.split('_')

      // Create newly checked notification types
      if (value === true) dispatch.createSub({
        organization: {
          id: props.organisationId,
        },
        category,
        min_severity: currentValues[`${category}_severity`],
        type,
      })

      // Delete unchecked notification types
      if ((value === null || value === false) && typeof state.initialValues[field] === 'string') dispatch.deleteSub(state.initialValues[field])

      // Edit any enabled notification types with the updated severity
      if (type === 'severity') Object.entries(currentValues)
        // If the value is a string it's a previously enabled subscription type
        // and the value is the sub id
        .filter(([valField]) => startsWith(valField, category))
        .filter(([, val]) => typeof val === 'string')
        .forEach(([, id]) => dispatch.editSub(
          id,
          {
            min_severity: value,
          },
        ))
    }),
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
  ),
  reduxForm({
    form: STORE_KEY,
    enableReinitialize: true,
  }),
  toJS,
)(NotificationSettings)
