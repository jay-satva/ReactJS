import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0, history: []
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.history.push(state.value), state.value += 1
    },
    decrement: (state) => {
      state.history.push(state.value), state.value -= 1
    },
    reset: (state) => {
      state.history.push(state.value), state.value = 0
    },
    setValue: (state, action) => {
        state.history.push(state.value), state.value = action.payload
    }
  },
});

export const { increment, decrement, reset, setValue } = counterSlice.actions;
export default counterSlice.reducer;