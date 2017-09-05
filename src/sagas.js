import { apiSagas, authSagas } from 'zc-core'

export default [
  apiSagas.watcher,
  authSagas.watcher,
]
