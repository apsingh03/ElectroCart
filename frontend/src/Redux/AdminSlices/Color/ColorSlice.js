import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createColorAsync = createAsyncThunk(
  "admin/createColor",
  async ({ name }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/colors/color/`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createColorAsync Error - ", error.response);
    }
  }
);

export const getColorAsync = createAsyncThunk("admin/getColor", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/admin/colors/color/`, {
      headers: { Authorization: `${adminToken}` },
    });
    return response.data;
  } catch (error) {
    console.log("getColorAsync Error - ", error.response);
  }
});

export const updateColorAsync = createAsyncThunk(
  "admin/updateColor",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/colors/color/${id}`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateColorAsync Error - ", error.response);
    }
  }
);

export const deleteColorAsync = createAsyncThunk(
  "admin/deleteColor",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/colors/color/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteColorAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createColorAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createColorAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createColorAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getColorAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getColorAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getColorAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateColorAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateColorAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });
          console.log("payload - ", action.payload.query);
          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            state.data.query[findIndex].name = action.payload.query.name;
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(updateColorAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteColorAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteColorAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteColorAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default colorSlice.reducer;
