import React, { Component } from 'react'
import View from 'react-flexbox'

import StatCard, { DELTA_UP, DELTA_DOWN } from '../../../widgets/StatCard/index'

/**
 * The Buildings view.
 */
const Buildings = (props) => {
  return (<div>
    <h3>Buildings</h3>
    <View row>
      <View column auto>
        <StatCard
          item={{
            figure: 162,
            desc: 'Alarms this month',
          }}
        />
      </View>

      <View column auto>
        <StatCard
          item={{
            figure: 401,
            desc: 'Avg. last 6 months',
            deltaType: DELTA_UP,
            deltaContent: '25%',
          }}
        />
      </View>

      <View column auto>
        <StatCard
          item={{
            figure: 240,
            desc: 'Avg. last 12 months',
            deltaType: DELTA_DOWN,
            deltaContent: '25%',
          }}
        />
      </View>

      <View column auto>
        <StatCard
          item={{
            key: 0,
            figure: 1024,
            desc: 'Annual Avg.',
            deltaType: DELTA_UP,
            deltaContent: '50%',
          }}
        />
      </View>
    </View>
  </div>)
}

export { Buildings as default }
