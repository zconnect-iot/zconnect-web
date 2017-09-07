import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { getUserIdFromToken, getEmailFromToken } from 'zc-core/auth/utils'
import { loginSuccess } from 'zc-core/auth/actions'

import Sentry from '../../sentry'
import jwtStore from '../../jwtStore'

import { OPTIMISTIC_LOGIN } from './constants'

function* optimisticLoginSaga() {
  try {
    const token = yield call(jwtStore.get)
    if (!token) throw new Error('No jwt token stored')
    const userId = getUserIdFromToken(token.password)
    const email = getEmailFromToken(token.password)
    yield put(loginSuccess(userId, email))
  }
  catch (e) {
    Sentry.captureMessage(e)
  }
}

export default function* authWatcher() {
  yield [
    takeLatest(OPTIMISTIC_LOGIN, optimisticLoginSaga),
  ]
}
