import React from 'react'
import { Spinner } from '../../'


export default function NoResults({
  className, style, api, errorMessage,
}) {
  return (
    <div style={style} className={className}>
      {api.get('pending') && <Spinner />}
      {api.get('success') && 'No results found'}
      {api.get('error') && (errorMessage || 'Data fetch failed')}
    </div>
  )
}
