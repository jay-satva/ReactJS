import { useEffect, useState } from 'react';
function Timer(){
    const[count, setCount] = useState(0)
    const[isActive, setActive] = useState(false)
    useEffect(()=>{
        let interval = null
        if(isActive){
            interval = setInterval(() => {
                setCount(prev => prev+1)
                //this is functional state update
                //prev is just parameter name
            }, 1000);
        }
        return()=>{
            clearInterval(interval)
        }
    }, [isActive])

    const toggle=()=>{
        setActive(prev=>!prev)
    }
    const reset=()=>{
        setCount(0)
        setActive(false)
    }

    return(
        <>
            <div>
                <h2>Count: {count}</h2>
                <button onClick={toggle}>
                    {isActive ? "Pause" : "Start"}
                </button>
                <button onClick={reset}>Reset</button>
            </div>
        </>
    )
}
export default Timer