import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios' 
export const fetchUser = createAsyncThunk(
    'user/fetchUser', 
    async (searchText, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      )
      const users = response.data;
      return users.filter((user)=>user.name.toLowerCase().includes(searchText.toLowerCase()))
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)
const initialState = {
  loading: false, users: [], error: null,
}

const userSlice = createSlice({
  name: "user", initialState, reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Something went wrong"
      })
  },
})

export default userSlice.reducer