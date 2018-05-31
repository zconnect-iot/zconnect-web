import { createSelector } from 'reselect'
import { selectResponse } from 'zc-core/api/selectors'

import XDate from 'xdate'
import { times } from 'lodash'
import { Map, List } from 'immutable'


// Select from props

const selectDeviceIdFromProps = (_, props) => props.deviceId

const selectTSDataResponse = state => selectResponse(state, { storeKey: 'tsData' }) || Map()

const selectTimeConfigFromProps = (_, props) => {
  const oclock = xdate => xdate.setMinutes(0).setSeconds(0).setMilliseconds(0)

  // The end time is the start of the given hour, unless that's in the future
  // or not provided in which case it's the start of the current hour
  let end = props.endTime 
    ? oclock(
        new XDate(
          Math.min(new XDate(props.endTime), new XDate())
        ).addSeconds(1)
      )
    : oclock(new XDate())

  // The start time is the start of the given hour, unless it's not provided in
  // which case it's 24 hours before the end time
  let start = props.startTime
    ? oclock(new XDate(props.startTime))
    : oclock(new XDate(end).addHours(-24))

  if (start.diffHours(end) <= 48) {
    // ...then each bar is an hour
    return {
      start,
      end,
      resolution: 60 * 60,
      bars: start.diffHours(end)
    }
  }

  // ...otherwise, each bar is a day
  return {
    start: start.setHours(0),
    end: end.setHours(0),
    resolution: 60 * 60 * 24,
    bars: start.diffDays(end)
  }
}


// Compound selectors

const selectTSData = createSelector(
  selectDeviceIdFromProps,
  selectTimeConfigFromProps,
  selectTSDataResponse,
  (deviceId, timeConfig, response) => {
    const data = response.getIn([deviceId, timeConfig.resolution], Map())
    const mapFn = d => d.set('ts', XDate(d.get('ts'), true).setUTCMode(false))
    const filterFn = d => timeConfig.start.diffSeconds(d.get('ts')) >= 0
                          && timeConfig.end.diffSeconds(d.get('ts')) <= 0
    return data.map(sensor => sensor.map(mapFn).filter(filterFn))
  }
)

const selectGraphData = createSelector(
  selectTSData,
  selectTimeConfigFromProps,
  (data, mode) => {
    // data = {
    //   door_open_time: [
    //     {ts: "2018-05-23T16:00:00", value: 900}
    //     ...
    //   ],
    //   external_activation: [...],
    //   ...
    // }

    if (data == undefined) return {}
    data = data.toJS()

    const outputObject = {}
    const outputArray = []
    const sensors = Object.keys(data)

    const sensorNames = sensors.map(sensor => {
      let denominator = 1
      let sensorName = sensor

      if (sensor.endsWith("_time")) {
        const maxTime = Math.max(...data[sensor].map(d => d.value))
        let unit = "seconds"
        if (maxTime >= 60) {
          denominator = 60
          unit = 'minutes'
        }
        if (maxTime >= 3600) {
          denominator = 3600
          unit = 'hours'
        }
        sensorName = sensor + " (" + unit + ")"
      }

      sensorName = sensorName.replace(/_/g, ' ')

      data[sensor].map(reading => {
        outputObject[reading.ts.toUTCString()] = outputObject[reading.ts.toUTCString()] || {}
        outputObject[reading.ts.toUTCString()][sensorName] = (reading.value || 0)/denominator
      })

      return sensorName
    })

    Object.keys(outputObject).map(timestamp => {
      const obj = outputObject[timestamp]
      obj.ts = new Date(timestamp)
      obj.label = (mode.resolution === 3600 
        // ? String(obj.ts.getHours()) + ":00 "
        ? obj.ts.toLocaleString('en-GB', { weekday: "short", hour: '2-digit', minute: '2-digit' })
        : obj.ts.toLocaleString('en-GB', { month: 'long', day: 'numeric' })
      ).toString()
      outputArray.push(obj)
    })

    return {
      data: outputArray,
      sensors: sensorNames
    }
  },
)

export { selectDeviceIdFromProps, selectGraphData, selectTimeConfigFromProps }