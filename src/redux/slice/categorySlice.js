import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch allShops data
export const shopCategory = createAsyncThunk(
  "category/shopCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getallcategory",
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
      return rejectWithValue(error.response?.data || "Error fetching allShops");
    }
  }
);
// Async thunk to fetch allShops data
export const shopbyCategory = createAsyncThunk(
  "category/shopbyCategory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/getstorebycategory", id, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching shops by category"
      );
    }
  }
);

// Initial state
const initialState = {
  allCategory: [],
  categorySalon: [],
  loading: false,
  error: null,
};

// Create slice
const allCategorySlice = createSlice({
  name: "allCategory",
  initialState,
  reducers: {
    clearAllCategory(state) {
      state.allCategory = null;
      state.categorySalon = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shopCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shopCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategory = action.payload;
      })
      .addCase(shopCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //salons by caegory
      .addCase(shopbyCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shopbyCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categorySalon = action.payload;
      })
      .addCase(shopbyCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAllCategory } = allCategorySlice.actions;

export default allCategorySlice.reducer;
