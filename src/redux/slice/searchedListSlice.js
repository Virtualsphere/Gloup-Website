import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch allShops data
export const shopbySearchValue = createAsyncThunk(
  "searchValue/shopbySearchValue",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/getstorebysearch", id, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching shops by searchvalue"
      );
    }
  }
);

// Initial state
const initialState = {  
  searchValue: [],
  loading: false,
  error: null,
};

// Create slice
const shopbySearchValueSlice = createSlice({
  name: "searchedValue",
  initialState,
  reducers: {
    clearAllSearchbyValues(state) {
      state.searchValue = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shopbySearchValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shopbySearchValue.fulfilled, (state, action) => {
        state.loading = false;
        state.searchValue = action.payload;
      })
      .addCase(shopbySearchValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllSearchbyValues } = shopbySearchValueSlice.actions;

export default shopbySearchValueSlice.reducer;
