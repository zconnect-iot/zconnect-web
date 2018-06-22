Single Pin at lat long provided (REQUIRES API KEY)
```jsx
<GoogleMap
  center={{ lat: 51.460346, lng: -2.612759 }}
  apiKey="API_KEY_GOES_HERE"
/>
```

Passing children with center prop renders them at that location (REQUIRES API KEY)
```jsx
<GoogleMap
  center={{ lat: 51.460346, lng: -2.612759 }}
  apiKey="API_KEY_GOES_HERE"
  >
  <div lat={51.465} lng={-2.61277}>Hello</div>
</GoogleMap>
```
