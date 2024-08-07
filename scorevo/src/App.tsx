import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>SCOREVO</h1>
      <p>Fully personalizable scoreboard for live football events</p>
    </>
  )
}

export default App
