import PropTypes from 'prop-types'

export const themeColors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'grey',
  'minor',
  'light',
]

export const oneOfThemeColors = PropTypes.oneOf(themeColors)
