import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// coupon
export const getCoupon = createAsyncThunk(
  "coupon/getCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getactivecoupons",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error coupon");
    }
  }
);

// verify coupon
export const verifyCoupon = createAsyncThunk(
  "coupon/verifyCoupon",
  async (code, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/validatecoupon",
        code,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error coupon verify");
    }
  }
);

const initialState = {
  couponList: [],
  couponData: {},
  loading: false,
  error: null,
};

// Slice
const getCouponSlice = createSlice({
  name: "getcoupon",
  initialState,
  reducers: {
    clearCouponState(state) {
      state.couponList = [];
      state.couponData = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getCoupon
      .addCase(getCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.couponList = action.payload;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // verifyCoupon
      .addCase(verifyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.couponData = action.payload;
      })
      .addCase(verifyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearCouponState } = getCouponSlice.actions;
export default getCouponSlice.reducer;
