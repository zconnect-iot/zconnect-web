import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Icon } from '../../components'

import './style.scss'

export const classes = new BEMHelper('Card')

const CardIcon = ({ name, className }) => (
  <div {...classes('icon-wrapper', null, className)}>
    <div {...classes('icon')}>
      <Icon name={name} />
    </div>
  </div>
)
CardIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}
CardIcon.defaultProps = {
  className: '',
}

/**
 * A card component with title, subtitle, image, icon and content
 */
const Card = (props) => {
  let title = null
  if (typeof props.title === 'string')
    title = <h4 {...classes('title')}>{props.title}</h4>
  else if (props.title)
    title = props.title

  let subtitle = null
  if (typeof props.subtitle === 'string')
    subtitle = <h6 {...classes('subtitle')}>{props.subtitle}</h6>
  else if (props.subtitle)
    subtitle = props.subtitle

  const image = props.image ? <img src={props.image.src} alt={props.image.alt} /> : null
  const icon = props.icon ? <CardIcon name={props.icon} /> : null
  return (
    <div {...classes('', props.panel && 'panel', props.className)}>
      {title}
      {(image || subtitle || icon) && (
        <div {...classes('top-content')}>
          {icon}
          {image}
          {subtitle}
        </div>
      )}
      <div {...classes('border-top')}>
        {props.children}
      </div>
    </div>
  )
}

Card.propTypes = {
  /** A title to be displayed in a title bar */
  title: PropTypes.string,
  /** A subtitle to display below title & image */
  subtitle: PropTypes.string,
  /** The `src` and `alt` for an image.= */
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  /** An optional icon to display by the image */
  icon: PropTypes.string,
  /** Content to show inside this Card */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /** An additional class name to show */
  className: PropTypes.string,
  /** Whether to display as a bold panel */
  panel: PropTypes.bool,
}

Card.defaultProps = {
  title: undefined,
  subtitle: undefined,
  image: null,
  icon: '',
  children: null,
  className: '',
  panel: false,
}

export default Card
