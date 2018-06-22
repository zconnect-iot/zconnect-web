import React from 'react'
import PropTypes from 'prop-types'
import GMap from 'google-map-react'
import BEMHelper from 'react-bem-helper'

import Marker from './Marker'
import './style.scss'

/**
  Wrapper around google-map-react that defaults to showing a Marker at the
  lat and long provided in the center prop.

  If children are passed it renders them instead and positions them at their lat
  lng props e.g.

  Requires a valid Google Maps API key
*/

const classes = BEMHelper({ name: 'GoogleMap' })

export default function GoogleMap({ center, zoom, children, className, color, apiKey, ...props }) {
  // Note: can't call this component 'Map' because react-styleguidist breaks
  return (
    <div {...classes(null, null, className)}>
      <GMap
        resetBoundsOnResize
        bootstrapURLKeys={{
          key: apiKey,
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        {...props}
      >
        {children || <Marker {...center} color={color} />}
      </GMap>
    </div>
  )
}

GoogleMap.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  color: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
}

GoogleMap.defaultProps = {
  zoom: 12,
  children: null,
  className: '',
  color: 'success',
}
