import React from 'react'
import PropTypes from 'prop-types'
import GoogleMap from 'google-map-react'
import BEMHelper from 'react-bem-helper'

import Marker from './Marker'

import './style.scss'


const classes = BEMHelper({ name: 'Map' })

export default function Map({ center, zoom, label, children, className }) {
  return (
    <div {...classes(null, null, className)}>
      <GoogleMap
        resetBoundsOnResize
        bootstrapURLKeys={{
          key: 'AIzaSyDLynB-9IZEJM0DF6Q6HED17a4UHmeAMqs',
        }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {children || <Marker {...center}>{label}</Marker>}
      </GoogleMap>
    </div>
  )
}

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  label: PropTypes.string,
  className: PropTypes.string,
}

Map.defaultProps = {
  zoom: 11,
  children: null,
  label: '',
  className: '',
}
