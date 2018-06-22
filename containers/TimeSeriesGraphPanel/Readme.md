TimeSeriesGraphPanel example:

(Using fixed start and end time to match mock data provided to store)

```jsx
<TimeSeriesGraphPanel
  startTime="2018-06-19T09:00:00.000Z"
  endTime="2018-06-20T09:00:00.000Z"
  deviceId="DEVICE_ID"
  modes={[
    { title: 'Activation', keys: ['activation'] },
    { title: 'Temperature', keys: ['temperature'] },
  ]}
/>
```
