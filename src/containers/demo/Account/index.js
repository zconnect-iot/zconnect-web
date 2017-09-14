import React, { Component } from 'react'
import View from 'react-flexbox'

import PersonalDetails from '../PersonalDetails/index'

import style from './style.scss'

/**
 * The Account container.
 */
export default (props) => {
  return (<div>
    <h3>Account</h3>

    <View row>
      <View column auto>
        <PersonalDetails />
      </View>
    </View>
  </div>)
}
