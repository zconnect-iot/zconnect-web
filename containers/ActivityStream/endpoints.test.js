import { times } from 'lodash'
import { fromJS } from 'immutable'

import endpoints from './endpoints'

const { storeMethod } = endpoints.getActivities

export const makeResults = (count = 3) => times(count, i => ({
  id: `${i}`,
  category: 'system',
  created_at: '2018-06-07T08:05:34.245412',
  description: 'Open time was less than 5%',
  notify: true,
  severity: 40,
  verb: 'reported',
}))

const makeResponse = ({
  count = 3,
  results = makeResults(count),
} = {}) => fromJS({
  count,
  results,
})

describe('ActivityStream storeMethod', () => {
  test('stores a reference to the params used in the last fetch', () => {
    const params = {
      start: null,
      end: null,
      page: 1,
    }
    const results = makeResults()
    const nextState = storeMethod(undefined, makeResponse({ results }), params)
    expect(nextState).toEqual(fromJS({
      results,
      params,
    }))
  })
  test('concats results if start and end params match', () => {
    // 1 page fetched
    const state = fromJS({
      params: {
        start: null,
        end: null,
        page: 1,
      },
      results: [1, 2, 3],
    })
    const params = {
      start: null,
      end: null,
      page: 2,
    }
    const nextState = storeMethod(state, makeResponse(), params)
    expect(nextState.get('results').size).toEqual(6)
  })
  test('over writes results if page 1', () => {
    const state = fromJS({
      params: {
        start: null,
        end: null,
        page: 2,
      },
      results: [1, 2, 3, 4, 5],
    })
    const params = {
      start: null,
      end: null,
      page: 1,
    }
    const results = makeResults()
    const nextState = storeMethod(state, makeResponse({ results }), params)
    expect(nextState.get('results').size).toEqual(3)
  })
})
