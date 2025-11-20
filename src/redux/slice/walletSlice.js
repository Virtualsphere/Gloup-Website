import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Create wallet order
export const createWalletOrder = createAsyncThunk(
  "wallet/createWalletOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/create_order_wallet",
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error creating wallet order"
      );
    }
  }
);

//  Deposit to wallet
export const depositToWallet = createAsyncThunk(
  "wallet/depositToWallet",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/addwallet", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error depositing to wallet"
      );
    }
  }
);

//  Get wallet amount
export const getWalletAmount = createAsyncThunk(
  "wallet/getWalletAmount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getwalletamout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching wallet amount"
      );
    }
  }
);

//  Get transaction history
export const getTransactionHistory = createAsyncThunk(
  "wallet/getTransactionHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/gettrasactions",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching transaction history"
      );
    }
  }
);

//  Initial State
const initialState = {
  addWallet: null,
  createOrderResponse: null,
  walletAmount: 0,
  transactionHistory: [],
  loading: false,
  error: null,
};

//  Slice
const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearWalletState(state) {
      state.addWallet = null;
      state.createOrderResponse = null;
      state.walletAmount = null;
      state.transactionHistory = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      //  createWalletOrder
      .addCase(createWalletOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWalletOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.createOrderResponse = action.payload;
      })
      .addCase(createWalletOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  depositToWallet
      .addCase(depositToWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(depositToWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.addWallet = action.payload;
      })
      .addCase(depositToWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  getWalletAmount
      .addCase(getWalletAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWalletAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.walletAmount = action.payload;
      })
      .addCase(getWalletAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  getTransactionHistory
      .addCase(getTransactionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionHistory = action.payload;
      })
      .addCase(getTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWalletState } = walletSlice.actions;

export default walletSlice.reducer;
