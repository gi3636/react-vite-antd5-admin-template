/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { USER_INFO } from '@/constant';

const initialState = {
  username: 'test',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const data = action.payload;
      localStorage.setItem(USER_INFO, JSON.stringify(data));
      return {
        ...state,
        ...data,
      };
    },
    userLogout: (state) => {
      localStorage.removeItem(USER_INFO);
      localStorage.removeItem('token');
      return {
        ...initialState,
      };
    },
  },
});
export const { updateUser, userLogout } = UserSlice.actions;
export default UserSlice.reducer;
