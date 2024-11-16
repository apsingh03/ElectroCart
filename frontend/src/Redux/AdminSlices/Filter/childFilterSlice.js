import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createChildFilterAsync = createAsyncThunk(
  "admin/createChildFilter",
  async ({ name, parent_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/filter/child/name`,
        {
          name,
          parent_id,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createChildFilterAsync Error - ", error.response);
    }
  }
);

export const getChildFilterAsync = createAsyncThunk(
  "admin/getChildFilter",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/admin/filter/child/name`, {
        headers: { Authorization: `${adminToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getChildFilterAsync Error - ", error.response);
    }
  }
);

export const updateChildFilterAsync = createAsyncThunk(
  "admin/updateChildFilter",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/filter/child/name/${id}`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateChildFilterAsync Error - ", error.response);
    }
  }
);

export const deleteChildFilterAsync = createAsyncThunk(
  "admin/deleteChildFilter",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/filter/child/name/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteChildFilterAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const childFilterSlice = createSlice({
  name: "childFilter",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createChildFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createChildFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createChildFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getChildFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getChildFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getChildFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateChildFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateChildFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            state.data.query[findIndex].name = action.payload.query.name;
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(updateChildFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteChildFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteChildFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteChildFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default childFilterSlice.reducer;
