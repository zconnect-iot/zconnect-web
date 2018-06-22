Passed an object as dictionary prop
```jsx
<Codeblock dictionary={{
    hello: 'you',
    hereIs: 'a map',
  }}
/>
```

Passed a string (in this example, the component source code.. meta)
```jsx
<Codeblock>
  {`export default function Codeblock({ dictionary, children, className }) {
  const codeString = children || JSON.stringify(dictionary, null, '  ')
  return (
    <div className={classnames('Codeblock', className)}>
      <pre className="Codeblock__pre">
        {codeString}
      </pre>
    </div>
  )
}`}
</Codeblock>
```
