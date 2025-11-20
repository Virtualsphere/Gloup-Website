import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
    clearMobile: (state) => {
      state.mobile = null;
    },
  },
});

export const { setMobile, clearMobile } = authSlice.actions;
export default authSlice.reducer;
