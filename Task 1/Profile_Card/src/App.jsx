import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import UserCard from './components/UserCard'
import './App.css'

function App() {
  
  return (
    <>
      <div className="card-container">
        <UserCard name="John Doe" role="Developer" isAvailable={true}></UserCard>
        <UserCard name="Jane Smith" role="Designer" isAvailable={true}></UserCard>
        <UserCard name="Alex Doe" role="Manager" isAvailable={false}></UserCard>
      </div>
    </>
  )
}

export default App
