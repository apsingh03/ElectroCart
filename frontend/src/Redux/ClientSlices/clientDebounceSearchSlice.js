import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

export const clientDebouncedSearchAsync = createAsyncThunk(
  "client/clientDebouncedSearch",
  async ({ inputQuery }) => {
    try {
      const response = await axios.get(`${HOSTNAME}/client/debounce/search/`, {
        params: {
          inputQuery,
        },
      });
      return response.data;
    } catch (error) {
      console.log("clientDebouncedSearchAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const debounceSearchSlice = createSlice({
  name: "debounceSearchSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(clientDebouncedSearchAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientDebouncedSearchAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(clientDebouncedSearchAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default debounceSearchSlice.reducer;
