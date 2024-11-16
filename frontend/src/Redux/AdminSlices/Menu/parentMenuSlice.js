import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createParentMenuAsync = createAsyncThunk(
  "admin/createParentMenu",
  async ({ name, routeLink }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/menu/parent/name`,
        {
          name,
          routeLink,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createParentMenuAsync Error - ", error.response);
    }
  }
);

export const getParentMenuAsync = createAsyncThunk(
  "admin/getParentMenu",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/admin/menu/parent/name`, {
        headers: { Authorization: `${adminToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getParentMenuAsync Error - ", error.response);
    }
  }
);

export const updateParentMenuAsync = createAsyncThunk(
  "admin/updateParentMenu",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/menu/parent/name/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateParentMenuAsync Error - ", error.response);
    }
  }
);

export const deleteParentMenuAsync = createAsyncThunk(
  "admin/deleteParentMenu",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/menu/parent/name/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteParentMenuAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const parentMenuSlice = createSlice({
  name: "parentMenu",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createParentMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createParentMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createParentMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getParentMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getParentMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getParentMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateParentMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateParentMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            state.data.query[findIndex].name = action.payload.query.name;
            state.data.query[findIndex].routeLink =
              action.payload.query.routeLink;
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(updateParentMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteParentMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteParentMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteParentMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default parentMenuSlice.reducer;
