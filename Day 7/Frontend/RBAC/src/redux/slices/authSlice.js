import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false, user: null, error: null, token: null, permissions: []
}

const authSlice = createSlice({
    initialState, name: 'auth', 
    reducers:{
        login:(state, action)=>{
            const found = 
            state.isAuthenticated= true
            state.user = action.payload.user
            state.error = null
            state.token = action.payload.token
        },
        logout:(state, action)=>{
            state.isAuthenticated = false
            state.user = null
            state.error = null
            state.token = null
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer