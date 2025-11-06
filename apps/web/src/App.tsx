

import { useEffect, useState } from 'react'
import './styles/App.css'

export default function App() {
  const [health, setHealth] = useState<unknown>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);

  useEffect(() => {
    fetch("/api/health")
      .then(r => r.json())
      .then(setHealth)
      .catch(console.error)
  }, [])


  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <h1>React + Express (TS)</h1>
      <pre>{JSON.stringify(health, null, 2)}</pre>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}