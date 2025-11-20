import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// add favourites
export const addFavourites = createAsyncThunk(
  "favourites/addFavourites",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/addfavourites",
        id,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error add favourites");
    }
  }
);

// Get all favourites
export const shopFavourites = createAsyncThunk(
  "favourite/shopFavourites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getfavourites",
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
        error.response?.data || "Error fetching favourites"
      );
    }
  }
);

// Delete a favourite
export const deleteFavourite = createAsyncThunk(
  "favourite/deleteFavourite",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/deletefavourites",
        { id },
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
        error.response?.data || "Error deleting favourite"
      );
    }
  }
);


const initialState = {
  allFavourites: [],
  addFavourite: "",
  loading: false,
  error: null,
};

// Slice
const allFavouritesSlice = createSlice({
  name: "allFavourites",
  initialState,
  reducers: {
    clearAllFavourites(state) {
      state.allFavourites = [];
      state.addFavourite = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // add Favourites
      .addCase(addFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.addFavourite = action.payload;
      })
      .addCase(addFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // shopFavourites
      .addCase(shopFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shopFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.allFavourites = action.payload;
      })
      .addCase(shopFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteFavourite
      .addCase(deleteFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.allFavourites = state.allFavourites.filter(
          (fav) => fav.store_id !== action.payload
        );
      })
      .addCase(deleteFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearAllFavourites } = allFavouritesSlice.actions;
export default allFavouritesSlice.reducer;
