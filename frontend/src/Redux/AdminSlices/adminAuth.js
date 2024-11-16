import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

export const createAdminAsync = createAsyncThunk(
  "admin/createAdmin",
  async ({ email, fullName, password }) => {
    try {
      const response = await axios.post(`${HOSTNAME}/admin/auth/signup`, {
        email: email,
        fullName: fullName,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.log("createUserAsync Error - ", error.response);
    }
  }
);

export const loginAdminAsync = createAsyncThunk(
  "admin/loginAdmin",
  async ({ email, password }) => {
    try {
      const response = await axios.post(`${HOSTNAME}/admin/auth/login`, {
        email: email,
        password: password,
      });

      return response.data;
    } catch (error) {
      console.log("loginUserAsync Error  ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  loggedData: {
    isUserLogged:
      localStorage.getItem("adminLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("adminLoggedToken")).isUserLogged
        : null,
    id:
      localStorage.getItem("adminLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("adminLoggedToken")).id
        : null,
    fullName:
      localStorage.getItem("adminLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("adminLoggedToken")).fullName
        : null,
    email:
      localStorage.getItem("adminLoggedToken") !== null
        ? jwtDecode(localStorage.getItem("adminLoggedToken")).email
        : null,
  },
};

export const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createAdminAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createAdminAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(createAdminAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(loginAdminAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(loginAdminAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default adminAuthSlice.reducer;
