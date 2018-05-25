import { createSelector } from 'reselect'
import { selectResponse } from 'zc-core/api/selectors'
import XDate from 'xdate'

import { times } from 'lodash'

import { Map, List } from 'immutable'

const graphConfig = {
  '24hrs': {
    resolution: 60 * 60,
    bars: 24,
  },
  week: {
    resolution: 24 * 60 * 60,
    bars: 7,
  },
  month: {
    resolution: 24 * 60 * 60,
    bars: 28,
  },
}

export const selectGraphModeFromProps = (_, { location }) => 'week'

// TODO: FIX!
export const selectDeviceIdFromProps = (_, { match }) => 1


const selectTimeSeriesDataResponse = state => selectResponse(
  state,
  { storeKey: 'tsData' },
) || Map()

export const selectModeObject = createSelector(
  selectGraphModeFromProps,
  mode => {
    const config = graphConfig[mode]
    config.range = config.resolution * config.bars
    return config
  }
)

export const selectResolutionForMode = createSelector(
  selectGraphModeFromProps,
  mode => graphConfig[mode].resolution,
)

export const selectTSDataForResolution = createSelector(
  selectDeviceIdFromProps,
  selectTimeSeriesDataResponse,
  selectModeObject,
  (deviceId, data, mode) => data.getIn([deviceId, mode.resolution], Map()),
)

export const selectGraphEndForMode = createSelector(
  selectGraphModeFromProps,
  (mode) => {
    return mode === '24hrs'
      ? (new XDate()).setMinutes(0).setSeconds(0).setMilliseconds(0)
      : (new XDate()).clearTime(0)
  }
)

export const selectGraphStartForMode = createSelector(
  selectModeObject,
  selectGraphEndForMode,
  (mode, end) => end.clone().addSeconds(-mode.range)
)


export const selectGraphStartParam = createSelector(
  selectGraphStartForMode,
  start => {
    const time = start.getTime()
    console.log("selectGraphStartParam:", start, time)
    return time
  }
)

export const selectGraphEndParam = createSelector(
  selectGraphEndForMode,
  end => {
    const time = end.getTime()
    console.log("selectGraphEndParam:", end, time)
    return time
  }
)



export const selectTSDataForRange = createSelector(
  selectTSDataForResolution,
  selectGraphStartForMode,
  selectGraphEndForMode,
  (data, start, end) => data.map(sensor => sensor
    .map(d => d.set('ts', XDate(d.get('ts'), true).setUTCMode(false)))
    .filter(d => start.diffSeconds(d.get('ts')) >= 0 && end.diffSeconds(d.get('ts')) <= 0),
  ),
)

export const selectDoorOpenDataJS = createSelector(
  selectTSDataForRange,
  tsData => tsData
    .get('door_open_time', List())
    .toJS(),
)

export const selectBarsForMode = createSelector(
  selectGraphModeFromProps,
  mode => graphConfig[mode].bars,
)

// Returns a list of labels for the bars that will be merged with the available data
// to pad missing bars with zero's
const selectBarsForRange = createSelector(
  selectGraphStartForMode,
  selectBarsForMode,
  selectModeObject,
  (start, bars, mode) => times(bars, i => ({
    label: XDate(start).addSeconds(mode.resolution * i)[mode.resolution === 3600 ? 'getHours' : 'getDate']().toString(),
    value: 0,
  })),
)

export const selectGraphData = createSelector(
  selectTSDataForRange,
  selectModeObject,
  selectBarsForRange,
  (data, mode, bars) => {
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
    console.log("selectGraphData", data)

    const outputObject = {}
    const outputArray = []

    const sensors = Object.keys(data)


    sensors.map(sensor => {
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

      data[sensor].map(reading => {
        outputObject[reading.ts.toUTCString()] = outputObject[reading.ts.toUTCString()] || {}
        outputObject[reading.ts.toUTCString()][sensorName] = (reading.value || 0)/denominator
      })
    })

    Object.keys(outputObject).map(timestamp => {
      const obj = outputObject[timestamp]
      obj.ts = new Date(timestamp)
      obj.label = (mode.resolution === 3600 ? obj.ts.getHours() : obj.ts.getDate()).toString()
      outputArray.push(obj)
    })

    console.log("outputArray", outputArray)

    return outputArray
  },
)