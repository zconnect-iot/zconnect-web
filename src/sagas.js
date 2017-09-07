import { apiSagas, authSagas } from 'zc-core'
import rootWatcher from './containers/Root/sagas'

export default [
  // Core
  apiSagas.watcher,
  authSagas.watcher,

  // App
  rootWatcher,
]
