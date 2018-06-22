View console log output to see the login request action dispatched.
Email prop would normally come from url query params e.g. login?email=jim@zconnect.io
```jsx
<Login
  onForgotten={() => console.log('Nav to /forgotten')}
  email="jim@zconnect.io"
/>
```
