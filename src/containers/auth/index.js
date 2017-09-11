import React from 'react'
export { default as Login } from './Login'


export const Register = props => (<div>
  <h3>Register</h3>
  <pre>{JSON.stringify(props, null, 2)}</pre>
</div>)

export const Forgotten = props => (<div>
  <h3>Forgotten</h3>
  <pre>{JSON.stringify(props, null, 2)}</pre>
</div>)
