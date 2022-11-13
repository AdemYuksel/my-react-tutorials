import { useState } from 'react'
import UseStateTest from './components/UseState/UseStateTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <UseStateTest/>
    </div>
  )
}

export default App
