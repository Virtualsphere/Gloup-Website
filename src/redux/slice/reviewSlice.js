import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

//  Add review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/addreview", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error add review");
    }
  }
);
//  Fetch reviews
export const getReview = createAsyncThunk(
  "reviews/getReview",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getallreview",
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
      return rejectWithValue(error.response?.data || "Error fetching reviews");
    }
  }
);

//  Update a review
export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, rating, description }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/updaterating",
        {
          id,
          rating,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating review");
    }
  }
);

//  Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/deletereview",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting review");
    }
  }
);

// ✅ Initial state
const initialState = {
  myReview: [],
  addReview: {},
  loading: false,
  error: null,
};

//  Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearMyReviews(state) {
      state.myReview = [];
      state.addReview = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // add
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.addReview = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch
      .addCase(getReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.myReview = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        const updatedReview = action.payload;
        state.myReview = state.myReview.map((review) =>
          review.review_id === updatedReview.review_id ? updatedReview : review
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.myReview = state.myReview.filter(
          (review) => review.review_id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMyReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
