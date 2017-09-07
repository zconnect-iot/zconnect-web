import React from 'react'

export default function Settings(props) {
  return (
    <div>
      <h3>Settings</h3>
      <pre>{ JSON.stringify(props, null, 2) }</pre>
    </div>
  )
}
