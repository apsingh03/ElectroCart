import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createParentFilterAsync = createAsyncThunk(
  "admin/createParentFilter",
  async ({ name }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/filter/parent/name`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createParentFilterAsync Error - ", error.response);
    }
  }
);

export const getParentFilterAsync = createAsyncThunk(
  "admin/getParentFilterAsync",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/admin/filter/parent/name`, {
        headers: { Authorization: `${adminToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getParentFilterAsync Error - ", error.response);
    }
  }
);

export const updateParentFilterAsync = createAsyncThunk(
  "admin/updateParentFilter",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/filter/parent/name/${id}`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateParentFilterAsync Error - ", error.response);
    }
  }
);

export const deleteParentFilterAsync = createAsyncThunk(
  "admin/deleteParentFilter",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/filter/parent/name/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteParentFilterAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const parentFilterSlice = createSlice({
  name: "parentFilter",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createParentFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createParentFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createParentFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getParentFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getParentFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getParentFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateParentFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateParentFilterAsync.fulfilled, (state, action) => {
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

      .addCase(updateParentFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteParentFilterAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteParentFilterAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteParentFilterAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default parentFilterSlice.reducer;
