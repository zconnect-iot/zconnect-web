```jsx
initialState = { route: '/locks' };
<Page
  navigate={route => setState({ route })}
  navItems={[
    { title: 'Locks', icon: 'LOCK', route: '/locks'},
    { title: 'Buildings', icon: 'BUILDING', route: '/buildings'},
    { title: 'Users', icon: 'PERSON', route: '/users'},
  ]}
  location={state.route}
>
  Children go here
</Page>
```
