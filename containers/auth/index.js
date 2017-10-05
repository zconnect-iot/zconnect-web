import React from 'react'

export { default as Login } from './Login'
export { default as Forgotten } from './Forgotten'

export const Register = props => (<div>
  <h3>Register</h3>
  <pre>{JSON.stringify(props, null, 2)}</pre>
</div>)
