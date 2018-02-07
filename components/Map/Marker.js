import React from 'react'

export default function Marker({ children }) {
  return <div className="Map__Marker">{children || ''}</div>
}
