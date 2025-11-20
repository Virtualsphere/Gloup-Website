import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch shop detail
export const fetchShopDetail = createAsyncThunk(
  "shopDetail/fetchShopDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/getstorebyid", id, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching shopDetail"
      );
    }
  }
);

// Initial state
const initialState = {
  shopDetail: null,
  loading: false,
  error: null,
};

// Create slice
const shopDetailSlice = createSlice({
  name: "shopDetail",
  initialState,
  reducers: {
    clearShopDetail(state) {
      state.shopDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDetail = action.payload;
      })
      .addCase(fetchShopDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearShopDetail } = shopDetailSlice.actions;

export default shopDetailSlice.reducer;
