import './App.css'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
// import Footer from './components/Footer'
import StatusItem from './components/StatusItem'

function App() {

  const servers = [
    { id: 1, name: 'Database',     status: 'Online',      requestsPerSecond: 120, memoryUsage: '70%', temperature: '80 C' },
    { id: 2, name: 'Web Server',   status: 'Online',      requestsPerSecond: 230, memoryUsage: '50%', temperature: '50 C' },
    { id: 3, name: 'Auth Server',  status: 'Online',      requestsPerSecond: 200, memoryUsage: '80%', temperature: '70 C' },
    { id: 4, name: 'Proxy Server', status: 'Maintenance', requestsPerSecond: 0,   memoryUsage: '0%',  temperature: '20 C' },
    { id: 5, name: 'Cache',        status: 'Online',      requestsPerSecond: 20,  memoryUsage: '60%', temperature: '80 C' },
  ]

  return (
    <div className="app-container">
      {/* <Navbar title='Satva Solutions' /> */}
      <div className="main-layout">
        {/* <Sidebar /> */}
        <div className="content">
          <h2>Server Dashboard</h2>
          <p className="dashboard-subtitle">
            {servers.filter(s => s.status === 'Online').length} of {servers.length} servers online
          </p>

          {/* Wrap all cards in the grid */}
          <div className="status-grid">
            {servers.map((server) => (
              <StatusItem
                key={server.id}
                id={server.id}
                name={server.name}
                status={server.status}
                requestsPerSecond={server.requestsPerSecond}
                memoryUsage={server.memoryUsage}
                temperature={server.temperature}
              />
            ))}
          </div>

        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default App