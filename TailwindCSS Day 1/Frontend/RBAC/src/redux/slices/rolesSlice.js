import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roleService from '../../services/roleService'

const initialState = {
    roles: [], loading: false, saving: false, error: null 
}

export const fetchRoles = createAsyncThunk(
    'roles/fetchAll', 
    async(_, { rejectWithValue })=>{
        try{return await roleService.getAll()}
        catch (err){ return rejectWithValue(err.response?.data?.message || err.message) }
    }
)

export const updateRolePermissions = createAsyncThunk(
    "roles/updatePermissions",
    async ({ roleId, permissions }, { rejectWithValue }) => {
        try { return await roleService.updatePermissions(roleId, permissions) }
        catch (err) { return rejectWithValue(err.response?.data?.message || err.message) }
    }
)

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending,   (state) => { state.loading = true;  state.error = null })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false
                state.roles = action.payload.filter(r =>
                    ["Admin", "HR", "Manager", "Supervisor"].includes(r.name)
                )
            })
            .addCase(fetchRoles.rejected,  (state, action) => { state.loading = false; state.error = action.payload })

            .addCase(updateRolePermissions.pending,   (state) => { state.saving = true })
            .addCase(updateRolePermissions.fulfilled, (state, action) => {
                state.saving = false
                const idx = state.roles.findIndex(r => r.id === action.payload.id)
                if (idx !== -1) state.roles[idx] = action.payload
            })
            .addCase(updateRolePermissions.rejected,  (state, action) => {
                state.saving = false
                state.error = action.payload
            })
    }
})

export default rolesSlice.reducer