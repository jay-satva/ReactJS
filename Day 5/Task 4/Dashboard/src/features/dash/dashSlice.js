import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    darkTheme: false, collapsed: false
}
const dashSlice = createSlice({
    name: 'dash', initialState, 
    reducers:{
        toggleTheme: (state)=>{
            state.darkTheme = !state.darkTheme
        },
        toggleSidebar: (state)=>{
            state.collapsed = !state.collapsed
        }
    }
})
export const {toggleTheme, toggleSidebar} = dashSlice.actions
export default dashSlice.reducer