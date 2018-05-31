import { fromJS } from 'immutable'
import * as selectors from './selectors'

jest.mock('zc-core/auth/selectors', () => ({
  selectUserId: jest.fn().mockReturnValue('CURRENT_USER'),
}))

const state = fromJS({
  api: {
    subscriptions: {
      response: {
        USER_ID: [
          {
            id: 1,
            organization: {
              id: 'ORG_ID',
              name: 'My cool Organization',
            },
            category: 'business metrics',
            min_severity: 30,
            type: 'sms',
          },
          {
            id: 2,
            organization: {
              id: 'ORG_ID',
              name: 'My cool Organization',
            },
            category: 'business metrics',
            min_severity: 20,
            type: 'email',
          },
          {
            id: 3,
            organization: {
              id: 'ORG_ID',
              name: 'My cool Organization',
            },
            category: 'maintenance',
            min_severity: 0,
            type: 'smoke',
          },
          {
            id: 4,
            organization: {
              id: 'ORG_ID',
              name: 'My cool Organization',
            },
            category: 'maintenance',
            min_severity: 30,
            type: 'push',
          },
        ],
        CURRENT_USER: [
          {
            id: 1,
            organization: {
              id: 'ORG_ID',
              name: 'My cool Organization',
            },
            category: 'business metrics',
            min_severity: 30,
            type: 'pigeon',
          },
        ],
      },
    },
  },
})


describe.only('selectors', () => {
  describe('selectSubsByOrg', () => {
    test('selector maps subs to correct shape', () => {
      const shape = selectors.selectSubsByOrg(state, { userId: 'USER_ID' })
      expect(shape.toJS()).toEqual({
        ORG_ID: {
          'business metrics': {
            sms: 1,
            email: 2,
            severity: 30,
          },
          'maintenance': {
            smoke: 3,
            push: 4,
            severity: 0,
          },
        },
      })
    })

    test('selector uses current logged in user if no prop provided', () => {
      const shape = selectors.selectSubsByOrg(state, {})
      expect(shape.toJS()).toEqual({
        ORG_ID: {
          'business metrics': {
            pigeon: 1,
            severity: 30,
          },
        },
      })
    })
  })

  describe('selectInitialValues', () => {
    test('returns a map of field value initial values', () => {
      const initialVals = selectors.selectInitialValues(
        state,
        {
          userId: 'USER_ID',
          organisationId: 'ORG_ID',
          categories: ['business metrics', 'maintenance'],
          types: [['SMS', 'sms'], ['E-mail', 'email'], ['Smoke signals', 'smoke']],
          severities: [['Important', 30], ['Some', 20], ['All', 0]],
        },
      )
      expect(initialVals).toEqual({
        'business metrics_sms': 1,
        'business metrics_email': 2,
        'business metrics_smoke': false,
        'business metrics_severity': 30,
        maintenance_sms: false,
        maintenance_email: false,
        maintenance_smoke: 3,
        maintenance_severity: 0,
      })
    })
  })
})
