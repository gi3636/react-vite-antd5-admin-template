/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tabHistory: [] as any[],
};

const TabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    addTabHistory: (state, action) => {
      const data = action.payload;
      console.log('data', data);
      if (state.tabHistory.length === 0) {
        state.tabHistory.push(data);
      }
      const isExist = state.tabHistory.some((item) => item.id === data.id);
      if (!isExist) {
        state.tabHistory.push(data);
      }
    },
    deleteTabHistory: (state, action) => {
      const data = action.payload;
      console.log('data', data);
      state.tabHistory = state.tabHistory.filter((item) => item.path !== data);
      console.log('state.tabHistory', state.tabHistory);
    },
  },
});
export const { addTabHistory, deleteTabHistory } = TabSlice.actions;
export default TabSlice.reducer;
