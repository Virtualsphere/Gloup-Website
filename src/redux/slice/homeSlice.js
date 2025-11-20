import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api.js";

// Async thunk to fetch allShops data
export const fetchAllShops = createAsyncThunk(
  "allShops/fetchAllShops",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getallstores",
        data,
        {
          headers: {
            "Content-Type": "application/json", // optional in GET, but included here per request
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching allShops");
    }
  }
);

// Async thunk to fetch Nearby Shops data
export const fetchNearbyShops = createAsyncThunk(
  "nearByShops/fetchNearbyShops",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/getnearbystores", data, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching nearby");
    }
  }
);

// Async thunk to fetch topShops data
export const fetchTopShops = createAsyncThunk(
  "allShops/fetchTopShops",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/topsaloons",
        {},
        {
          headers: {
            "Content-Type": "application/json", // optional in GET, but included here per request
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching topShops");
    }
  }
);
// Async thunk to fetch Banner data
export const fetchBanners = createAsyncThunk(
  "banners/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getbanner",
        {},
        {
          headers: {
            "Content-Type": "application/json", // optional in GET, but included here per request
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching banners");
    }
  }
);

// Initial state
const initialState = {
  allShops: [],
  nearByShops: [],
  topshops: [],
  banner: [],
  loading: false,
  error: null,
};

// Create slice
const allShopsSlice = createSlice({
  name: "allShops",
  initialState,
  reducers: {
    clearAllShops(state) {
      state.allShops = null;
      state.nearByShops = null;
      state.topshops = null;
      state.banner = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShops.fulfilled, (state, action) => {
        state.loading = false;
        state.allShops = action.payload;
      })
      .addCase(fetchAllShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // nearby
      .addCase(fetchNearbyShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNearbyShops.fulfilled, (state, action) => {
        state.loading = false;
        state.nearByShops = action.payload;
      })
      .addCase(fetchNearbyShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //topshops

      .addCase(fetchTopShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopShops.fulfilled, (state, action) => {
        state.loading = false;
        state.topshops = action.payload;
      })
      .addCase(fetchTopShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // banner
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllShops } = allShopsSlice.actions;

export default allShopsSlice.reducer;
