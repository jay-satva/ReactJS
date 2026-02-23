import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: 0, history: [], disabled: false
}

const counterSlice = createSlice({
    name:'counter', initialState, 
    reducers:{
        increment: (state)=>{
            state.history.push(state.value), state.value+=1
        },
        decrement: (state)=>{
            state.history.push(state.value), state.value-=1
        },
        reset: (state)=>{
            state.history.push(state.value), state.value=0
        },
        disable: (state)=>{
            state.disabled = !state.disabled
        }
    }
})
export const {increment, decrement, reset, disable} = counterSlice.actions;
export default counterSlice.reducer