import React from 'react'
import PropTypes from 'prop-types'
import GoogleMap from 'google-map-react'
import BEMHelper from 'react-bem-helper'

import Marker from './Marker'
import './style.scss'

/*
  Wrapper around google-map-react that defaults to showing a Marker at the
  lat and long provided in the center prop.
  If children are passed it renders them instead and position them at thir lat
  lng props e.g.

  <Map center={{ lat: 51.460346, lng: -2.612759 }}>
    <MyMarker lat={51.465} lng={-2.61277} />
  </Map>

*/

const classes = BEMHelper({ name: 'Map' })

export default function Map({ center, zoom, children, className, ...props }) {
  return (
    <div {...classes(null, null, className)}>
      <GoogleMap
        resetBoundsOnResize
        bootstrapURLKeys={{
          key: 'AIzaSyDLynB-9IZEJM0DF6Q6HED17a4UHmeAMqs',
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        {...props}
      >
        {children || <Marker {...center} />}
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
  className: PropTypes.string,
}

Map.defaultProps = {
  zoom: 12,
  children: null,
  className: '',
}
