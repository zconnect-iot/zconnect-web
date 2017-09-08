import React, { Component } from 'react'
import View from 'react-flexbox'

import PersonalDetails from '../PersonalDetails/index'

import style from './style.scss'

/**
 * The Account container.
 */
const Account = (props) => {
  return (<div>
    <h3>Account</h3>

    <View row>
      <View column auto>
        <PersonalDetails />
      </View>
    </View>
  </div>)
}

export { Account as default }
