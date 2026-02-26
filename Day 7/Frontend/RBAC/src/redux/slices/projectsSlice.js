import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import projectService from "../../services/projectService"

const initialState = {
    projects: [],
    loading: false,
    error: null,
}

export const fetchProjects = createAsyncThunk(
    "projects/fetchAll",
    async (_, { rejectWithValue }) => {
        try { return await projectService.getAll() }
        catch (err) { return rejectWithValue(err.response?.data?.message || err.message) }
    }
)

export const createProject = createAsyncThunk(
    "projects/create",
    async (data, { rejectWithValue }) => {
        try { return await projectService.create(data) }
        catch (err) { return rejectWithValue(err.response?.data?.message || err.message) }
    }
)

export const updateProject = createAsyncThunk(
    "projects/update",
    async ({ id, ...data }, { rejectWithValue }) => {
        try { return await projectService.update(id, data) }
        catch (err) { return rejectWithValue(err.response?.data?.message || err.message) }
    }
)

export const deleteProject = createAsyncThunk(
    "projects/delete",
    async (id, { rejectWithValue }) => {
        try { return await projectService.delete(id) }
        catch (err) { return rejectWithValue(err.response?.data?.message || err.message) }
    }
)

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending,   (state) => { state.loading = true; state.error = null })
            .addCase(fetchProjects.fulfilled, (state, action) => { state.loading = false; state.projects = action.payload })
            .addCase(fetchProjects.rejected,  (state, action) => { state.loading = false; state.error = action.payload })

            .addCase(createProject.fulfilled, (state, action) => { state.projects.push(action.payload) })

            .addCase(updateProject.fulfilled, (state, action) => {
                const idx = state.projects.findIndex(p => p.id === action.payload.id)
                if (idx !== -1) state.projects[idx] = action.payload
            })

            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projects = state.projects.filter(p => p.id !== action.payload)
            })
    }
})

export default projectsSlice.reducer