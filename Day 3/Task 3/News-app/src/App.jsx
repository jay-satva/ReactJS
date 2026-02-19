import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FetchData from './Component/FetchData'

function App() {

  return (
    <>
      <h1>Live News</h1>
      <FetchData></FetchData>
    </>
  )
}

export default App
