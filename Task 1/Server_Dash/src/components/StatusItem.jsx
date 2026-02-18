import './StatusItem.css'

function StatusItem({ id, name, status, requestsPerSecond, memoryUsage, temperature }) {

  // Convert "70%" -> 70 for the progress bar
  const memoryNum = parseInt(memoryUsage)
  const memoryClass = memoryNum >= 80 ? 'high' : memoryNum >= 60 ? 'medium' : ''
  const statusClass = status.toLowerCase()

  return (
    <div className={`status-item ${statusClass}`}>

      {/* Header: name + badge */}
      <div className="status-header">
        <div>
          <div className="status-name">{name}</div>
          <div className="server-id">SRV-{String(id).padStart(3, '0')}</div>
        </div>
        <div className={`status-badge ${statusClass}`}>{status}</div>
      </div>

      {/* Stats */}
      <div className="status-stats">

        <div className="stat-block">
          <span className="stat-label">Req / sec</span>
          <span className="stat-value">{requestsPerSecond}</span>
        </div>

        <div className="stat-block">
          <span className="stat-label">Memory</span>
          <span className="stat-value">{memoryUsage}</span>
          <div className="memory-bar-track">
            <div
              className={`memory-bar-fill ${memoryClass}`}
              style={{ width: memoryUsage }}
            />
          </div>
        </div>

        <div className="stat-block">
          <span className="stat-label">Temp</span>
          <span className="stat-value">{temperature}</span>
        </div>

      </div>
    </div>
  )
}

export default StatusItem