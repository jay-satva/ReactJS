import { useState, useEffect, useReducer } from "react";
const initCount = {
    count: 0, history: []
}
function reducer(state, action){
    switch(action.type){
        case 'INCREMENT':
            return{
                count: state.count+1, history: [...state.history, state.count]
            }

        case 'DECREMENT':
            return{
                count: state.count-1, history: [...state.history, state.count]
            }

        case 'RESET':
            return{
                count: 0, history: [...state.history, state.count]
            }

        case 'SET_VALUE':
            return{
                count: action.payload, history: [...state.history, state.count]
            }

        default: return state
    }
}

function Timer(){
    const [state, dispatch] = useReducer(reducer, initCount)
    const [input, setInput] = useState('')
    return(
        <>
            <h3>Count {state.count}</h3>
            
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>

            <br/><br/>

            <input type="number" placeholder="Set value" value={input} onChange={(e) => setInput(e.target.value)}/>

            <button onClick={() => {dispatch({type: 'SET_VALUE', payload: Number(input)})}}>Set Value</button>

            <h4>History:</h4>
            <ul>
                {state.history.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
        </>
    )
}
export default Timer