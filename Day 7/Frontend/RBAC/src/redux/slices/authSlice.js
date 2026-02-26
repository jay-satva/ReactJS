import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";
import { isRejectedWithValue } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, user: null, error: null, token: null, permissions: [], loading: false,
}

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         body: JSON.stringify({
//           name: credentials.name,
//           password: credentials.password,
//         }),
//       })
//       const data = await response.json();
//       if (!response.ok) return rejectWithValue(data.message)
//       return data
//     } catch (error) {
//       return rejectWithValue("Server issue")
//     } finally {
//     }
//   },
// )
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials)
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message)
    }
  },
)

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = false
      state.user = null
      state.error = null
      state.permissions =[]
      state.token = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        ((state.loading = true), (state.error = null))
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.loading = false),
          (state.error = null),
          (state.user = action.payload.user),
          (state.isAuthenticated = true),
          (state.token = action.payload.token),
          (state.permissions = action.payload.permissions))
      })
      .addCase(loginUser.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload))
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer