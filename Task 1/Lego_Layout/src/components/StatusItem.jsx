import './StatusItem.css'
function StatusItem({id, name, status, rps, memory, temp}){
    return(
        <>
            <div className="detailContainer">
                <div className="serverDetails">
                    <span>Server ID: {id} &nbsp; <strong>|</strong> &nbsp;</span>
                    <span>Name: {name} &nbsp; <strong>|</strong> &nbsp;</span>
                    <span className={`color ${status === 'Online'? 'green':'orange'}`}>Status: {status} &nbsp; <strong>|</strong> &nbsp;</span>
                    <span>Request per second: {rps} &nbsp; <strong>|</strong> &nbsp;</span>
                    <span>Memory usage: {memory} &nbsp; <strong>|</strong> &nbsp;</span>
                    <span>Temperature: {temp} &nbsp; </span>
                </div>
            </div>
        </>
    )
}
export default StatusItem