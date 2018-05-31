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


// TODO: FIX!
export const selectGraphModeFromProps = (_, props) => 'week'
export const selectDeviceIdFromProps = (_, props) => props.deviceId
export const selectStartFromProps = (_, props) => props.start
export const selectEndFromProps = (_, props) => props.end

export const selectTimeConfigFromProps = (_, props) => {
  const oclock = xdate => xdate.setMinutes(0).setSeconds(0).setMilliseconds(0)

  console.log(props.endTime)

  // The end time is the start of the given hour, unless that's in the future
  // or not provided in which case it's the start of the current hour
  let end = props.endTime 
    ? oclock(
        new XDate(
          Math.min(new XDate(props.endTime), new XDate())
        ).addSeconds(1)
      )
    : oclock(new XDate())

  console.log(end)

  // The start time is the start of the given hour, unless it's not provided in
  // which case it's 24 hours before the end time
  let start = props.startTime
    ? oclock(new XDate(props.startTime))
    : oclock(new XDate(end).addHours(-24))

  if (start.diffHours(end) <= 48) {
    // each bar is an hour
    const ret =  {
      resolution: 60 * 60,
      bars: start.diffHours(end),
      start,
      end
    }
    return ret
  }

  // each bar is a day
  end = end.setHours(0)
  start = start.setHours(0)
  const ret = {
    resolution: 60 * 60 * 24,
    bars: start.diffDays(end),
    start,
    end
  }
  console.log(ret)
  return ret
  // const now = new XDate()

  // if (now < end) {
  //   end = (new XDate()).setMinutes(0).setSeconds(0).setMilliseconds(0)
  // }

  // if (start)

  // if (!start || !end) {
  //   return {
  //     resolution: 60*60,
  //     bars: 24,
  //     start: (new XDate()).setMinutes(0).setSeconds(0).setMilliseconds(0),
  //     end: start - (hours * 60 * 60 * 1000)
  //   }
  // }

  // // start by working out the number of hours between the start and the end
  // const hours = Math.round((end - start) / (60 * 60 * 1000))
  // if (hours <= 48) {
  //   end = end.setMinutes(0).setSeconds(0).setMilliseconds(0)
  //   start = end - (hours * 60 * 60 * 1000)
  //   return { start, end, resolution: 60*60, bars: hours }
  // }




  // console.log("start", start)
  // console.log("end", end)
  // console.log("end-start", end-start)
  // console.log("hours", hours)



  // If the total range is less that two days, do an hourly display
  // If it's up to a month or two, do a daily display
  // If longer than that, do a weekly display

}


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
  selectTimeConfigFromProps,
  (deviceId, data, timeConfig) => data.getIn([deviceId, timeConfig.resolution], Map()),
)

// export const selectGraphEndForMode = createSelector(
//   selectGraphModeFromProps,
//   (mode) => {
//     return mode === '24hrs'
//       ? (new XDate()).setMinutes(0).setSeconds(0).setMilliseconds(0)
//       : (new XDate()).clearTime(0)
//   }
// )

// export const selectGraphStartForMode = createSelector(
//   selectModeObject,
//   selectGraphEndForMode,
//   (mode, end) => end.clone().addSeconds(-mode.range)
// )


// export const selectGraphStartParam = createSelector(
//   selectGraphStartForMode,
//   start => {
//     const time = start.getTime()
//     console.log("selectGraphStartParam:", start, time)
//     return time
//   }
// )

// export const selectGraphEndParam = createSelector(
//   selectGraphEndForMode,
//   end => {
//     const time = end.getTime()
//     console.log("selectGraphEndParam:", end, time)
//     return time
//   }
// )

const selectTSData = createSelector(
  selectDeviceIdFromProps,
  selectTimeConfigFromProps,
  selectTimeSeriesDataResponse,
  (deviceId, timeConfig, response) => {
    const data = response.getIn([deviceId, timeConfig.resolution], Map())
    const mapFn = d => d.set('ts', XDate(d.get('ts'), true).setUTCMode(false))
    const filterFn = d => timeConfig.start.diffSeconds(d.get('ts')) >= 0
                          && timeConfig.end.diffSeconds(d.get('ts')) <= 0
    const ret = data.map(sensor => sensor.map(mapFn).filter(filterFn))
    return ret
  }
)



// export const selectTSDataForRange = createSelector(
//   selectTSDataForResolution,
//   selectGraphStartForMode,
//   selectGraphEndForMode,
//   (data, start, end) => data.map(sensor => sensor
//     .map(d => d.set('ts', XDate(d.get('ts'), true).setUTCMode(false)))
//     .filter(d => start.diffSeconds(d.get('ts')) >= 0 && end.diffSeconds(d.get('ts')) <= 0),
//   ),
// )

// export const selectDoorOpenDataJS = createSelector(
//   selectTSDataForRange,
//   tsData => tsData
//     .get('door_open_time', List())
//     .toJS(),
// )

export const selectBarsForMode = createSelector(
  selectGraphModeFromProps,
  selectTimeConfigFromProps,
  (mode, timeConfig) => graphConfig[mode].bars,
)

// Returns a list of labels for the bars that will be merged with the available data
// to pad missing bars with zero's
const selectBarsForRange = createSelector(
  selectTimeConfigFromProps,
  timeConfig => times(timeConfig.bars, i => {
    const method = timeConfig.resolution === 3600 ? 'getHours' : 'getDate'
    return {
      label: new XDate(timeConfig.start).addSeconds(timeConfig.resolution * i)[method]().toString(),
      value: 0,
    }
  })
)

export const selectGraphData = createSelector(
  selectTSData,
  selectTimeConfigFromProps,
  selectBarsForRange,
  (data, mode, bars) => {
    console.log("bars", bars)
    console.log("mode", mode)
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

    console.log("data", data)

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

    console.log(outputArray)

    return {
      data: outputArray,
      sensors: sensorNames
    }
  },
)