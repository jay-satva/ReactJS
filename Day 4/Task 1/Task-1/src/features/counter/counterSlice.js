import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0, history: []
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1, [...state.history, state.value]
    },
    decrement: (state) => {
      state.value -= 1, [...state.history, state.value]
    },
    reset: (state) => {
        state.value = 0, [...state.history, state.value]
    },
    setValue: (state) => {
        state.value = action.payload, [...state.history, state.value]
    }
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;