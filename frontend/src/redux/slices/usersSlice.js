import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const allUsers = createAsyncThunk("profile/all-users", async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/user/all-users`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log("Failed to fetch users", error.message);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload?.users;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default usersSlice.reducer;
