import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: {},
};

const setBookNowSlice = createSlice({
  name: "setBookNow",
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload; // Set the object
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null; // Clear it
    },
  },
});

export const { setSelectedItem, clearSelectedItem } = setBookNowSlice.actions;

export default setBookNowSlice.reducer;
