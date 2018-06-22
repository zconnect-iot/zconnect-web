Check the console output to see the batch request action dispatched on clicking Save.
This type of action would be handled by the zc-core api middleware in real environment.

```jsx
<NotificationSettings
  organisationId="2"
  categories={['business metrics', 'maintenance', 'system']}
  types={[
    ['SMS', 'sms'],
    ['Smoke signals', 'smoke'],
    ['Carrier pigeon', 'pigeon'],
  ]}
/>
```
