```jsx
class DateRangeModalWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
    this.toggleOpen = this.toggleOpen.bind(this)
  }
  toggleOpen() {
    this.setState((prevState, props) => ({
      isOpen: !prevState.isOpen
    }))
  }
  render() {
    return (
      <div>
        <button onClick={this.toggleOpen}>Open</button>
        <DateRangeModal
          visible={this.state.isOpen}
          onChangeDates={range => console.log(`Date range changed to: ${range}`)}
          closeModal={this.toggleOpen}
        />
      </div>
    )
  }
};
<DateRangeModalWrapper />
```
