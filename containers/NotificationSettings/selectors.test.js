const selectors = require('./selectors')
const fromJS = require('immutable').fromJS

const state = fromJS({
  api: {
    subscriptions: {
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
      ],
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
          'company events': {
            sms: 3,
            push: 4,
            severity: 0,
          },
        },
      })
    })
  })
})
