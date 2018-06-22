import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
import { startsWith } from 'lodash'
import { compose } from 'recompose'

import { toJS } from 'zc-core/hocs'
import { apiRequest, apiBatchRequest } from 'zc-core/api/actions'
import { selectErrorMessage } from 'zc-core/api/selectors'
import { selectUserId } from 'zc-core/auth/selectors'

import {
  selectInitialValues,
  selectCurrentValues,
  selectBatchApiState,
  selectApiState,
  STORE_KEY,
  selectChangesRequiringAction,
} from './selectors'
import { NotificationSettings as Uncomposed } from './NotificationSettings'


const mapStateToProps = (state, props) => ({
  initialValues: selectInitialValues(state, props),
  currentValues: selectCurrentValues(state),
  changes: selectChangesRequiringAction(state, props),
  errorMessage: selectErrorMessage(state, { storeKey: STORE_KEY }),
  api: selectApiState(state),
  batchApi: selectBatchApiState(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  fetchSubs: () => dispatch(apiRequest(
    'getSubscriptions',
    { userId: props.userId || selectUserId },
  )),
  createSub: sub => apiRequest(
    'postSubscription',
    { userId: props.userId || selectUserId },
    sub,
  ),
  deleteSub: subscriptionId => apiRequest(
    'deleteSubscription',
    {
      userId: props.userId || selectUserId,
      subscriptionId,
    },
  ),
  editSub: (subscriptionId, patch) => apiRequest(
    'editSubscription',
    {
      userId: props.userId || selectUserId,
      subscriptionId,
    },
    patch,
  ),
  batchRequest: requests => dispatch(apiBatchRequest(
    'subscriptionsBatch',
    requests,
  )),
})

const mergeProps = (state, dispatch, props) => {
  const currentValues = state.currentValues.toJS()
  return {
    ...state,
    ...props,
    isDirty: !!state.changes.length,
    fetchSubs: dispatch.fetchSubs,
    submitForm: () => {
      const requests = {}
      state.changes.forEach(([field, value]) => {
        const [category, type] = field.split('_')

        // Create newly checked notification types
        if (value === true) requests[field] = dispatch.createSub({
          organization: {
            id: props.organisationId,
          },
          category,
          min_severity: currentValues[`${category}_severity`],
          type,
        })

        // Delete unchecked notification types
        if (value === null && typeof state.initialValues[field] === 'string')
          requests[field] = dispatch.deleteSub(state.initialValues[field])


        // Edit any enabled notification types with the updated severity
        if (type === 'severity') Object.entries(currentValues)
          // If the value is a string it's a previously enabled subscription type
          // and the value is the sub id
          .filter(([valField]) => startsWith(valField, category))
          .filter(([, val]) => typeof val === 'string')
          .forEach(([fieldName, id]) => (requests[fieldName] = dispatch.editSub(
            id,
            {
              min_severity: value,
            },
          )))
      })
      return dispatch.batchRequest(requests)
    },
  }
}

const Composed = compose(
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
)(Uncomposed)

/**
  Provides a zconnect api connected dynamic form component for updating a users'
  subscription settings.

  - Fetches the subscriptions for the user and organisation id provided and stores
  the response by user id.
  - Renders a redux controlled form based off the categories, types and severities
  props.
  - Converts the fetched list of subscriptions into the initial state for the form
  - Shows the save button if the settings are changed which dispatches the appropriate
  POST, PATCH and DELETE requests for the changes made when clicked
*/

export default function NotificationSettings({ ...props }) {
  return <Composed {...props} />
}

NotificationSettings.propTypes = {
  organisationId: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  severities: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ),
  types: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string),
  ),
  userId: PropTypes.string,
}

NotificationSettings.defaultProps = {
  severities: [['Important', 30], ['Some', 20], ['All', 0]],
  types: [['SMS', 'sms'], ['E-mail', 'email']],
  userId: '',
}
