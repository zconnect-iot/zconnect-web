import React from 'react'
import { noop } from 'lodash'
import { fromJS } from 'immutable'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import { Page } from '../../components'

import { makeResults } from './endpoints.test'

import ActivityStream from './'

const DEVICE_ID = 'DEVICE_ID'

const makeApiState = ({
  deviceId = DEVICE_ID,
  start,
  end,
  page = 1,
  count = 10,
}) => fromJS({
  params: {
    deviceId,
    start,
    end,
    page,
  },
  results: makeResults(count),
})

const createState = ({
  deviceId = DEVICE_ID,
  start,
  end,
  page = 1,
}) => mockState.setIn(
  ['api', 'activities', 'response'],
  makeApiState({ deviceId, start, end, page, count: page * 10 }),
)

describe('ActivityStream', () => {
  describe('mapStateToProps', () => {
    test('activities are returned if stored results match params', () => {
      const state = createState({ page: 2 })
      const store = configureStore()(state)
      const wrapper = mount(<Provider store={store}>
        <Page navigate={noop} location={{ pathname: '/' }}>
          <ActivityStream
            deviceId={DEVICE_ID}
          />
        </Page>
      </Provider>)
      const props = wrapper.find('ActivityStream').props()
      expect(props.activities).toEqual(state.toJS().api.activities.response.results)
    })
    test('no activities are returned if stored results do not match params', () => {
      const state = createState({ page: 2 })
      const store = configureStore()(state)
      const wrapper = mount(<Provider store={store}>
        <Page navigate={noop} location={{ pathname: '/' }}>
          <ActivityStream
            deviceId="SOME_OTHER_DEVICE_ID"
          />
        </Page>
      </Provider>)
      const props = wrapper.find('ActivityStream').props()
      expect(props.activities).toEqual([])
    })
  })
  describe('mergeProps', () => {
    describe('fetchActivities', () => {
      test('fetches the first page on mount', () => {
        const start = null
        const end = null
        const store = configureStore()(mockState) // No received activities data
        mount(<Provider store={store}>
          <Page navigate={noop} location={{ pathname: '/' }}>
            <ActivityStream
              deviceId={DEVICE_ID}
              start={start}
              end={end}
            />
          </Page>
        </Provider>)
        const requestActions = store.getActions().filter(action => action.type === 'core/api/REQUEST')
        expect(requestActions[0]).toEqual({
          type: 'core/api/REQUEST',
          meta: {
            endpoint: 'getActivities',
            params: {
              start,
              end,
              deviceId: DEVICE_ID,
              page: 1,
              page_size: 10,
            },
          },
          payload: {},
        })
      })
      test('fetches sequential pages on subsequent calls', () => {
        const start = null
        const end = null
        const store = configureStore()(createState({ page: 2, start, end })) // 2 pages of data already fetched
        const wrapper = mount(<Provider store={store}>
          <Page navigate={noop} location={{ pathname: '/' }}>
            <ActivityStream
              deviceId={DEVICE_ID}
              start={start}
              end={end}
            />
          </Page>
        </Provider>)
        const requestActions = store.getActions().filter(action => action.type === 'core/api/REQUEST')
        expect(requestActions[0]).toEqual({
          type: 'core/api/REQUEST',
          meta: {
            endpoint: 'getActivities',
            params: {
              start,
              end,
              deviceId: DEVICE_ID,
              page: 3,
              page_size: 10,
            },
          },
          payload: {},
        })
      })
    })
  })
})
