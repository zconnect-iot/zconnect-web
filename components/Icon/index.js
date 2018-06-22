import React from 'react'
import { noop } from 'lodash'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { themeColors } from '../../utils/propTypes'
import ICONS from '../../assets/icons/map'

const classes = BEMHelper({ name: 'Icon' })

/**
  Renders an SVG with the path attributes defined in `assets/icons/map.json`

  You can test out the different name, size, color combos in the storybook

  Inspired by [this post](https://medium.com/@david.gilbertson/icons-as-react-components-de3e33cb8792)
*/
export default function Icon({ name, color, size, className, onClick }) {
  const pathAttrs = ICONS[name]
  const fill = color ? `text-${color}` : null

  return (
    <svg
      {...classes(null, name, [fill, className])}
      width={size ? `${size}px` : '100%'}
      height={size ? `${size}px` : '100%'}
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path {...pathAttrs} />
    </svg>
  )
}

const themeColorsOrNone = [...themeColors, '']

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
  color: PropTypes.oneOf(themeColorsOrNone),
  size: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  size: 0,
  color: '',
  className: '',
  onClick: noop,
}
