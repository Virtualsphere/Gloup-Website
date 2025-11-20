import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Get all notification
export const getNotification = createAsyncThunk(
  "favourite/getNotification",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getnotification",
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
        error.response?.data || "Error fetching notification"
      );
    }
  }
);

const initialState = {
  allNotification: [],
  loading: false,
  error: null,
};

// Slice
const allNotificationSlice = createSlice({
  name: "allNotification",
  initialState,
  reducers: {
    clearAllNotification(state) {
      state.allNotification = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // getNotification
      .addCase(getNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.allNotification = action.payload;
      })
      .addCase(getNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearAllNotification } = allNotificationSlice.actions;
export default allNotificationSlice.reducer;
