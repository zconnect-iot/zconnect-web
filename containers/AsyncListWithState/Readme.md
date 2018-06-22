This example is using the static data in the mock store so is not interactive
```jsx
const { ColumnDefinition, RowDefinition } = require('griddle-react');
initialState = { currentPage: 1 };
<AsyncListWithState
  endpoint="getPeople"
  storeKey="people"
  hideFilter
>
  <RowDefinition>
    <ColumnDefinition
      id="id"
      title="ID"
    />
    <ColumnDefinition
      id="name"
      title="Name"
    />
    <ColumnDefinition
      id="colour"
      title="Colour"
    />
  </RowDefinition>
</AsyncListWithState>
```
