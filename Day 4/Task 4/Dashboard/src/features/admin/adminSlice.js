import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    collapsed: false, darkTheme: true
}

const adminSlice = createSlice({
    name: 'admin', initialState, 
    reducers:{
        toggleSidebar: (state) => {
            state.collapsed = !state.collapsed
        },
        toggleTheme: (state) =>{
            state.darkTheme = !state.darkTheme
        }
    }
})

export const {toggleSidebar, toggleTheme} = adminSlice.actions
export default adminSlice.reducer