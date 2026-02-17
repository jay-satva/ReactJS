import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import StatusItem from './components/StatusItem'
function App() {
  const servers = [
    {id:1, name: 'Database', status:'Online', rps:120, memory: '70%', temp: '80 C'},
    {id:2, name: 'Web Server', status:'Online', rps:230, memory: '50%', temp: '50 C'},
    {id:3, name: 'Auth Server', status:'Online', rps:200, memory: '80%', temp: '70 C'},
    {id:4, name: 'Proxy Server', status:'Maintenance', rps:0, memory: '0%', temp: '20 C'},
    {id:5, name: 'Cache', status:'Online', rps:20, memory: '60%', temp: '80 C'}
  ]
  return (
    <>
      <div className="app-container">
        <Navbar title='Satva Solutions'/>
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <h2>Server Dashboard</h2>
            {/* <StatusItem/> */}
            {servers.map((server)=>(
              <StatusItem
                id={server.id}
                name={server.name}
                status={server.status}
                rps={server.rps}
                memory={server.memory}
                temp={server.temp}
              ></StatusItem>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
