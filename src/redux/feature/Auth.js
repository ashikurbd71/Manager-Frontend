import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators
export const { setUser } = authSlice.actions;

// Selector to get the user from the state
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
