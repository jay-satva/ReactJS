import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkTheme: false, collapsed: false
}

const uiSlice = createSlice({
    initialState, name: 'ui', 
    reducers:{
        toggleTheme: (state)=>{
            state.darkTheme = !state.darkTheme
        },
        toggleSidebar: (state)=>{
            state.collapsed = !state.collapsed
        }
    }
})
export const {toggleTheme, toggleSidebar} = uiSlice.actions
export default uiSlice.reducer