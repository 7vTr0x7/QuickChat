import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const userProfile = createAsyncThunk("profile/fetch", async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/user/profile`);
    return data;
  } catch (error) {
    console.log("Failed to fetch profile", error.message);
  }
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload.message;
      });
  },
});

export default profileSlice.reducer;
