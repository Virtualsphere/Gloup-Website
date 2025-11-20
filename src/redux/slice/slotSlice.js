import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch shop detail
export const fetchAvailableSlots = createAsyncThunk(
  "availabeSlots/fetchAvailableSlots",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/getslotbydate", data, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching availabeSlots"
      );
    }
  }
);

// Initial state
const initialState = {
  availabeSlots: [],
  loading: false,
  error: null,
};

// Create slice
const availabeSlotsSlice = createSlice({
  name: "availabeSlots",
  initialState,
  reducers: {
    clearAvailabeSlots(state) {
      state.availabeSlots = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.availabeSlots = action.payload;
        
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAvailabeSlots } = availabeSlotsSlice.actions;

export default availabeSlotsSlice.reducer;
