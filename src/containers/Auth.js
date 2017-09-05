import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'


export default function Auth(props) {
  return (
    <div>
      <h2>Login</h2>
      { JSON.stringify(props, null, 2) }
    </div>
  )
}
