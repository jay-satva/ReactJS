import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false, user: null, error: null
}

const MOCK_USERS = [
    { username: "admin", password: "admin123", role: "admin", name: "Admin" },
    { username: "john",  password: "john123",  role: "user",  name: "John" },
    { username: "jake",  password: "jake123",  role: "user",  name: "Jake" },
    { username: "matt",  password: "matt123",  role: "user",  name: "Matt" },
    { username: "tom",   password: "tom123",   role: "user",  name: "Tom" },
    { username: "ryan",  password: "ryan123",  role: "user",  name: "Ryan" },
    { username: "jack",  password: "jack123",  role: "user",  name: "Jack" },
    { username: "mark",  password: "mark123",  role: "user",  name: "Mark" },
    { username: "theo",  password: "theo123",  role: "user",  name: "Theo" },
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
                state.error = false
            }
            else{
                state.isAuthenticated = false
                state.user = {name: null, role: null}
                state.error = true
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