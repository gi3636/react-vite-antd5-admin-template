/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tabHistory: [] as any[],
};

const TabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTabHistory: (state, action) => {
      const data = action.payload;
      state.tabHistory = data;
    },
    addTabHistory: (state, action) => {
      const data = action.payload;
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
      state.tabHistory = state.tabHistory.filter((item) => item.path !== data);
    },
    clearAllTabHistory: (state) => {
      state.tabHistory = [];
    },
  },
});
export const { addTabHistory, deleteTabHistory, setTabHistory, clearAllTabHistory } = TabSlice.actions;
export default TabSlice.reducer;
