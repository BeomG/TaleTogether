import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email:'xodnjs8287@naver.com'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
