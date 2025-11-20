import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// de-activate
export const deActivateAccount = createAsyncThunk(
  "deActivate/deactivateAccount",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/deletuser",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error de-activate");
    }
  }
);

const initialState = {
  deActivate: "",
  loading: false,
  error: null,
};

// Slice
const deActivateAccountSlice = createSlice({
  name: "deActivateaccount",
  initialState,
  reducers: {
    clearDeActivate(state) {
      state.deActivate = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // deActivateAccount
      .addCase(deActivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deActivateAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.deActivate = action.payload;
      })
      .addCase(deActivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearDeActivate } = deActivateAccountSlice.actions;
export default deActivateAccountSlice.reducer;
