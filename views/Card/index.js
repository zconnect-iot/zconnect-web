import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { Icon } from '../../components'

import './style.scss'

export const classes = new BEMHelper('Card')

const CardIcon = ({ name }) => (
  <div {...classes('icon-wrapper')}>
    <div {...classes('icon')}>
      <Icon name={name} />
    </div>
  </div>
)
CardIcon.propTypes = {
  name: PropTypes.string.isRequired,
}

const Card = (props) => {
  let title = null
  if (typeof props.title === 'string')
    title = <h2 {...classes('title')}>{props.title}</h2>
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
    <div {...classes()}>
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
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  icon: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Card.defaultProps = {
  title: '',
  subtitle: '',
  image: null,
  icon: '',
  children: null,
}

export default Card
