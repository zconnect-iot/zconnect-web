import React, { Component } from 'react'
import View from 'react-flexbox'

import PersonalDetails from '../PersonalDetails/index'

/**
 * The Account container.
 */
const Account = (props) => {
  return (<div>
    <h3>Account</h3>

    <h4>Personal details</h4>
    <PersonalDetails />
  </div>)
}

export { Account as default }
