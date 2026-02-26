import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import employeeService from "../../services/employeeService"

const initialState = {
    employees: [],
    loading: false,
    error: null,
}

export const fetchEmployees = createAsyncThunk(
    "employees/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            return await employeeService.getAll()
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const createEmployee = createAsyncThunk(
    "employees/create",
    async (data, { rejectWithValue }) => {
        try {
            return await employeeService.create(data)
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const updateEmployee = createAsyncThunk(
    "employees/update",
    async ({ id, ...data }, { rejectWithValue }) => {
        try {
            return await employeeService.update(id, data)
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    "employees/delete",
    async (id, { rejectWithValue }) => {
        try {
            return await employeeService.delete(id)
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending,   (state) => { state.loading = true;  state.error = null })
            .addCase(fetchEmployees.fulfilled, (state, action) => { state.loading = false; state.employees = action.payload })
            .addCase(fetchEmployees.rejected,  (state, action) => { state.loading = false; state.error = action.payload })

            .addCase(createEmployee.fulfilled, (state, action) => { state.employees.push(action.payload) })

            .addCase(updateEmployee.fulfilled, (state, action) => {
                const idx = state.employees.findIndex(e => e.id === action.payload.id)
                if (idx !== -1) state.employees[idx] = action.payload
            })

            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(e => e.id !== action.payload)
            })
    }
})

export default employeesSlice.reducer