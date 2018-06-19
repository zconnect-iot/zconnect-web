import React from 'react'
import PropTypes from 'prop-types'

/**
 * Render an address. Simple.
 *
 * Pass as much or as little of the address as required. For example, it's not
 * always necessary to specify the locality or the country.
 *
 * @example ./example.md
 */
export default function Address(props) {
  const { street_address, locality, region, poboxno, postalcode, country, className } = props
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
  /** Typically the house number and street, e.g. 26 Example Road */
  street_address: PropTypes.string,
  /** The immediate area, such as a village or city district, e.g. Shoreditch */
  locality: PropTypes.string,
  /** The wider area, typically a city, county or state, e.g. London */
  region: PropTypes.string,
  /** Post box number, e.g. 104 */
  poboxno: PropTypes.string,
  /** Postcode (or ZIP code), e.g. E1 1AB */
  postalcode: PropTypes.string,
  /** Country, e.g. UK */
  country: PropTypes.string,
  /** A CSS class name to add to the rendered component, e.g. `device-address` */
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
