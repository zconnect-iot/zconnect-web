import { configureZC } from 'zc-core'

import AppSettings from './config/AppSettings'
import endpoints from './config/endpoints'
import jwtStore from './jwtStore'
import Sentry from './sentry'

configureZC({
  Sentry,
  jwtStore,
  endpoints,
  baseURL: AppSettings.baseURL,
  loginTimeout: AppSettings.loginTimeout,
})
