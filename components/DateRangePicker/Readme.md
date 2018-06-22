```jsx
initialState = { start: null, end: null };
<DateRangePicker
  onChange={({ start, end }) => setState({ start, end })}
  start={state.start}
  end={state.end}
/>
```
