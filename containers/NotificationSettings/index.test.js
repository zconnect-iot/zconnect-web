import React from 'react'
import { noop } from 'lodash'
import { fromJS } from 'immutable'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { Page } from '../../components'

import NotificationSettings from './'

const apiState = fromJS({
  USER_ID: [
    {
      id: '1',
      organization: {
        id: 'ORG_ID',
        name: 'My cool Organization',
      },
      category: 'business metrics',
      min_severity: 30,
      type: 'sms',
    },
    {
      id: '2',
      organization: {
        id: 'ORG_ID',
        name: 'My cool Organization',
      },
      category: 'business metrics',
      min_severity: 20,
      type: 'email',
    },
    {
      id: '3',
      organization: {
        id: 'ORG_ID',
        name: 'My cool Organization',
      },
      category: 'maintenance',
      min_severity: 0,
      type: 'smoke',
    },
    {
      id: '4',
      organization: {
        id: 'ORG_ID',
        name: 'My cool Organization',
      },
      category: 'maintenance',
      min_severity: 30,
      type: 'email',
    },
  ],
  CURRENT_USER: [
    {
      id: '1',
      organization: {
        id: 'ORG_ID',
        name: 'My cool Organization',
      },
      category: 'business metrics',
      min_severity: 30,
      type: 'pigeon',
    },
  ],
})

const createState = () => mockState
  .setIn(
    ['api', 'subscriptions', 'response'],
    apiState,
  )

const categories = ['business metrics', 'maintenance']
const types = [['SMS', 'sms'], ['E-mail', 'email']]
const severities = [['Important', 30], ['Some', 20], ['All', 0]]

describe('NotificationSettings', () => {
  describe('mapStateToProps', () => {
    test('initialValues', () => {
      // This duplicates the selector test but is more of an integration test
      const store = configureStore()(createState())
      const wrapper = mount(<Provider store={store}>
        <Page navigate={noop} location={{ pathname: '/' }}>
          <NotificationSettings
            organisationId="ORG_ID"
            categories={categories}
            types={types}
            severities={severities}
          />
        </Page>
      </Provider>)
      const props = wrapper.find('NotificationSettings').props()
      expect(props.initialValues).toEqual({
        'business metrics_sms': '1',
        'business metrics_email': '2',
        'business metrics_severity': 30,
        maintenance_sms: false,
        maintenance_email: '4',
        maintenance_severity: 0,
      })
    })
  })
  describe('mergeProps', () => {
    describe('submitForm', () => {
      test('submitForm dispatches DELETE when notification type is unchecked', () => {
        const store = configureStore()(createState().setIn(
          ['form', 'subscriptions', 'values'],
          fromJS({
            'business metrics_sms': null, // Simulate user unchecking this notification type
            'business metrics_email': '2',
            'business metrics_severity': 30,
            maintenance_sms: false,
            maintenance_email: '4',
            maintenance_severity: 0,
          }),
        ))
        const wrapper = mount(<Provider store={store}>
          <Page navigate={noop} location={{ pathname: '/' }}>
            <NotificationSettings
              userId="USER_ID"
              organisationId="ORG_ID"
              categories={categories}
              types={types}
              severities={severities}
            />
          </Page>
        </Provider>)
        const props = wrapper.find('NotificationSettings').props()
        props.submitForm()
        const batchRequestAction = store.getActions().find(action => action.type === 'core/api/BATCH_REQUEST')
        expect(batchRequestAction).toBeTruthy()
        const { payload } = batchRequestAction
        expect(Object.keys(payload).length).toEqual(1)
        expect(payload).toEqual({
          'business metrics_sms': {
            type: 'core/api/REQUEST',
            meta: {
              endpoint: 'deleteSubscription',
              params: {
                subscriptionId: '1',
                userId: 'USER_ID',
              },
            },
            payload: {},
          },
        })
      })
      test('submitForm dispatches POST when notification type is checked', () => {
        const store = configureStore()(createState().setIn(
          ['form', 'subscriptions', 'values'],
          fromJS({
            'business metrics_sms': '1',
            'business metrics_email': '2',
            'business metrics_severity': 30,
            maintenance_sms: true, // Simulate user checking this notification type
            maintenance_email: '4',
            maintenance_severity: 0,
          }),
        ))
        const wrapper = mount(<Provider store={store}>
          <Page navigate={noop} location={{ pathname: '/' }}>
            <NotificationSettings
              userId="USER_ID"
              organisationId="ORG_ID"
              categories={categories}
              types={types}
              severities={severities}
            />
          </Page>
        </Provider>)
        const props = wrapper.find('NotificationSettings').props()
        props.submitForm()
        const batchRequestAction = store.getActions().find(action => action.type === 'core/api/BATCH_REQUEST')
        expect(batchRequestAction).toBeTruthy()
        const { payload } = batchRequestAction
        expect(Object.keys(payload).length).toEqual(1)
        expect(payload).toEqual({
          maintenance_sms: {
            type: 'core/api/REQUEST',
            meta: {
              endpoint: 'postSubscription',
              params: {
                userId: 'USER_ID',
              },
            },
            payload: {
              category: 'maintenance',
              min_severity: 0,
              organization: {
                id: 'ORG_ID',
              },
              type: 'sms',
            },
          },
        })
      })
      test('submitForm dispatches PATCH when notification severity changed', () => {
        const store = configureStore()(createState().setIn(
          ['form', 'subscriptions', 'values'],
          fromJS({
            'business metrics_sms': '1',
            'business metrics_email': '2',
            'business metrics_severity': 30,
            maintenance_sms: false,
            maintenance_email: '4',
            maintenance_severity: 20, // Simulate user changing notification severity
          }),
        ))
        const wrapper = mount(<Provider store={store}>
          <Page navigate={noop} location={{ pathname: '/' }}>
            <NotificationSettings
              userId="USER_ID"
              organisationId="ORG_ID"
              categories={categories}
              types={types}
              severities={severities}
            />
          </Page>
        </Provider>)
        const props = wrapper.find('NotificationSettings').props()
        props.submitForm()
        const batchRequestAction = store.getActions().find(action => action.type === 'core/api/BATCH_REQUEST')
        expect(batchRequestAction).toBeTruthy()
        const { payload } = batchRequestAction
        expect(Object.keys(payload).length).toEqual(1)
        expect(payload).toEqual({
          maintenance_email: {
            type: 'core/api/REQUEST',
            meta: {
              endpoint: 'editSubscription',
              params: {
                subscriptionId: '4',
                userId: 'USER_ID',
              },
            },
            payload: {
              min_severity: 20,
            },
          },
        })
      })
      test('submitForm dispatches multiple requests when more than one change is made', () => {
        const store = configureStore()(createState().setIn(
          ['form', 'subscriptions', 'values'],
          fromJS({
            'business metrics_sms': '1',
            'business metrics_email': null, // Delete this
            'business metrics_severity': 30,
            maintenance_sms: true, // Post this
            maintenance_email: '4',
            maintenance_severity: 20, // Change maintenance_email
          }),
        ))
        const wrapper = mount(<Provider store={store}>
          <Page navigate={noop} location={{ pathname: '/' }}>
            <NotificationSettings
              userId="USER_ID"
              organisationId="ORG_ID"
              categories={categories}
              types={types}
              severities={severities}
            />
          </Page>
        </Provider>)
        const props = wrapper.find('NotificationSettings').props()
        props.submitForm()
        const batchRequestAction = store.getActions().find(action => action.type === 'core/api/BATCH_REQUEST')
        expect(batchRequestAction).toBeTruthy()
        const { payload } = batchRequestAction
        expect(Object.keys(payload).length).toEqual(3)
      })
    })
  })
})
