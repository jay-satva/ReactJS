import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "../../services/userService"

const initialState = {
    users: [],
    loading: false,
    error: null,
}

export const fetchUsers = createAsyncThunk(
    "users/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await userService.getAll()
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const createUser = createAsyncThunk(
    "users/create",
    async (userData, { rejectWithValue }) => {
        try {
            return await userService.create(userData)
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const updateUser = createAsyncThunk(
    "users/update",
    async ({ id, ...userData }, { rejectWithValue }) => {
        try {
            return await userService.update(id, userData)
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const deleteUser = createAsyncThunk(
    "users/delete",
    async (id, { rejectWithValue }) => {
        try {
            await userService.delete(id)
            return id  
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null })
            .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload })
            .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload })
            // create
            .addCase(createUser.fulfilled, (state, action) => { state.users.push(action.payload) })
            // update
            .addCase(updateUser.fulfilled, (state, action) => {
                const idx = state.users.findIndex(u => u.id === action.payload.id)
                if (idx !== -1) state.users[idx] = action.payload
            })
            // delete
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(u => u.id !== action.payload)
            })
    }
})

export default usersSlice.reducer