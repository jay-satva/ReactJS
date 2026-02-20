import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 1, name: "John Doe", email: "john@example.com", role: "Admin", contact: "1234567890"
    },
    {
      id: 2, name: "Alice Smith", email: "alice@example.com", role: "Manager", contact: "0987654321"
    },
    {
      id: 3, name: "Bob Brown", email: "bob@example.com", role: "User", contact: "135792460"
    },
    {
      id: 4, name: "Emma Wilson", email: "emma@example.com", role: "User", contact: "2468013579"
    },
    {
      id: 5, name: "David Lee", email: "david@example.com", role: "Editor", contact: "5432167890"
    }
  ]
};

const userSlice = createSlice({
  name: "user", initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user)=>user.id!=action.payload
      )
    }
  }
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;