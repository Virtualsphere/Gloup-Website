import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Get all appointments
export const getAllAppointments = createAsyncThunk(
  "AllAppointments/getAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getallapointments",
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
        error.response?.data || "Error fetching AllAppointments"
      );
    }
  }
);
// Reschedule Booking
export const rescheduleBook = createAsyncThunk(
  "reschedule/rescheduleBook",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/updatebooking", data, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching RescheduleBook"
      );
    }
  }
);
// cancel Booking
export const cancelBook = createAsyncThunk(
  "cancel/cancelBook",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/initiaterefund", data, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching cancelBook"
      );
    }
  }
);

const initialState = {
  allAppointments: {},
  updateBook: {},
  cancelBooking: "",
  loading: false,
  error: null,
};

const allAppointmentsSlice = createSlice({
  name: "allAppointments",
  initialState,
  reducers: {
    clearAllAppointments(state) {
      state.allAppointments = {};
      state.updateBook = {};
      state.cancelBooking = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // shopFavourites
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.allAppointments = action.payload;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateBook
      .addCase(rescheduleBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rescheduleBook.fulfilled, (state, action) => {
        state.loading = false;
        state.updateBook = action.payload;
      })
      .addCase(rescheduleBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // cancelBook
      .addCase(cancelBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBook.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelBooking = action.payload;
      })
      .addCase(cancelBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllAppointments } = allAppointmentsSlice.actions;
export default allAppointmentsSlice.reducer;
