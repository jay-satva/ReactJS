import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false, user: null
}

const MOCK_USERS = [
    { username: "admin", password: "admin123", role: "admin", name: "Admin User" },
    { username: "john",  password: "john123",  role: "user",  name: "John Doe" }
]

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            // action.payload = { username: "admin", password: "admin123" }
            const found = MOCK_USERS.find(
                u => u.username === action.payload.username && 
                     u.password === action.payload.password
            )
            if (found) {
                state.isAuthenticated = true
                state.user = { name: found.name, role: found.role }
            }
            else{
                state.isAuthenticated= false
                state.user={name: null,role:null}
            }
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer