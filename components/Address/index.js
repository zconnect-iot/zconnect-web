import React from 'react'
import PropTypes from 'prop-types'


export default function Address(props) {
  const {
    street_address, locality, region, poboxno, postalcode, country, className,
  } = props
  return (<div className={className}>
    {street_address && <p>{street_address}</p>}
    {locality && <p>{locality}</p>}
    {region && <p>{region}</p>}
    {poboxno && <p>{poboxno}</p>}
    {postalcode && <p>{postalcode}</p>}
    {country && <p>{country}</p>}
  </div>)
}

Address.propTypes = {
  street_address: PropTypes.string,
  locality: PropTypes.string,
  region: PropTypes.string,
  poboxno: PropTypes.string,
  postalcode: PropTypes.string,
  country: PropTypes.string,
  className: PropTypes.string,
}

Address.defaultProps = {
  street_address: '',
  locality: '',
  region: '',
  poboxno: '',
  postalcode: '',
  country: '',
  className: '',
}
