import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Async thunk to fetch profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/user/app/getuserprofile",
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
      return rejectWithValue(error.response?.data || "Error fetching profile");
    }
  }
);

// Async thunk to add invite code data
export const SendInviteCode = createAsyncThunk(
  "SendInviteCode/SendInviteCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/app/verifyinvitecode", data, {
        headers: {
          "Content-Type": "application/json", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error Send Invite Code");
    }
  }
);

// Async thunk to update profile
export const updateProfile = createAsyncThunk(
  "updateProfile/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/auth/updateuser", data, {
        headers: {
          "Content-Type": "multipart/form-data", // optional in GET, but included here per request
        },
        withCredentials: false,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updateProfile");
    }
  }
);

// Initial state
const initialState = {
  profile: [],
  inviteCode: "",
  updateProfile: "",
  loading: false,
  error: null,
};

// Create slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.inviteCode = null;
      state.updateProfile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // add Invite code
      .addCase(SendInviteCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SendInviteCode.fulfilled, (state, action) => {
        state.loading = false;
        state.inviteCode = action.payload;
      })
      .addCase(SendInviteCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProfile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
