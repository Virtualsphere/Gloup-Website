import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to create Order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/createorder", data , {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching createOrder"
      );
    }
  }
);

// Async thunk to paymentSuccess
export const paymentSuccess = createAsyncThunk(
  "payment/paymentSuccess",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/paymentsucssess", id, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching paymentSuccess"
      );
    }
  }
);

// Initial state
const initialState = {
  paymentSuccess: "",
  createOrder: "",
  loading: false,
  error: null,
};

// Create slice
const paymentSuccessSlice = createSlice({
  name: "paymentSuccess",
  initialState,
  reducers: {
    clearAllCategory(state) {
      state.paymentSuccess = null;
      state.createOrder = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.createOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //payment success
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentSuccess = action.payload;
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllCategory } = paymentSuccessSlice.actions;

export default paymentSuccessSlice.reducer;
