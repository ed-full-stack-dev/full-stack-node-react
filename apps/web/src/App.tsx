

import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [health, setHealth] = useState<unknown>(null)

  useEffect(() => {
    fetch("/api/health")
      .then(r => r.json())
      .then(setHealth)
      .catch(console.error)
  }, [])

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1>React + Express (TS)</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
    </div>
  )
}