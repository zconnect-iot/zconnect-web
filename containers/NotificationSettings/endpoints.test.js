const endpoints = require('./endpoints').default
const fromJS = require('immutable').fromJS

const subs = fromJS([
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
    category: 'company events',
    min_severity: 0,
    type: 'sms',
  },
  {
    id: 4,
    organization: {
      id: 'ORG_ID',
      name: 'My cool Organization',
    },
    category: 'company events',
    min_severity: 30,
    type: 'push',
  },
])

// const categories = ['business metrics', 'company events', 'another category']

describe.only('endpoints', () => {
  describe('getSubs', () => {
    test('storeMethod maps subs to correct shape', () => {
      const storeShape = endpoints.getSubscriptions.storeMethod(undefined, subs, { userId: 'USER_ID' })
      expect(storeShape.toJS()).toEqual({
        USER_ID: {
          ORG_ID: {
            'business metrics': {
              sms: 1,
              email: 2,
              severity: 30,
            },
            'company events': {
              sms: 3,
              push: 4,
              severity: 0,
            },
          },
        },
      })
    })
  })
})
