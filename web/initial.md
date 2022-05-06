```js
interface ButtonProps {
  text?: string
}

function Button(props: ButtonProps) {
  console.log(props.text)

  return (
    <button
      className="
      bg-violet-500 px-4 h-8 rounded text-white
      hover:bg-violet-800 transition-colors
    "
    >
      {props.text ?? 'Default'}
    </button>
  )
}

function App() {
  return (
    <div className="flex gap-2">
      <Button text="Hello" />
      <Button text="Aló" />
      <Button />
    </div>
  )
}

export default App

```