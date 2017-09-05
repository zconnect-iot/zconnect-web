import NativeSentry from 'raven-js'
import AppSettings from './config/AppSettings'

const ignoredErrors = AppSettings.sentryIgnore || {}

const Sentry = {
  captureException(error, config = { extra: {} }) {
    if (error.name === 'APIError') {
      const extra = {
        ...config.extra,
        error,
      }
      const { response } = error
      // Do not captureException with Sentry if error matches the properties in ignoredErrors
      const ignore = ignoredErrors[response.url] &&
        ignoredErrors[response.url][response.status]
      if (!ignore) NativeSentry.captureException(error, { ...config, extra })
      else NativeSentry.captureMessage(error, { ...config, extra })
    }
    else NativeSentry.captureException(error, config)
  },
  captureMessage(...args) {
    NativeSentry.captureMessage(...args)
  },
  setUserContext(...args) {
    NativeSentry.setUserContext(...args)
  },
  captureBreadcrumb(...args) {
    NativeSentry.captureBreadcrumb(...args)
  },
  setExtraContext(...args) {
    NativeSentry.setExtraContext(...args)
  },
}

export default Sentry
