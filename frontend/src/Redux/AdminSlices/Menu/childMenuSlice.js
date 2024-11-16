import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createChildMenuAsync = createAsyncThunk(
  "admin/createChildMenu",
  async ({ name, parent_id, routeLink }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/menu/child/name`,
        {
          name,
          parent_id,
          routeLink,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createChildMenuAsync Error - ", error.response);
    }
  }
);

export const getChildMenuAsync = createAsyncThunk(
  "admin/getChildMenu",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/admin/menu/child/name`, {
        headers: { Authorization: `${adminToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getChildMenuAsync Error - ", error.response);
    }
  }
);

export const updateChildMenuAsync = createAsyncThunk(
  "admin/updateChildMenu",
  async ({ updatedData, id }) => {
    try {
      // console.log("updatedData, id - ", updatedData, id);
      const response = await axios.patch(
        `${HOSTNAME}/admin/menu/child/name/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateChildMenuAsync Error - ", error.response);
    }
  }
);

export const deleteChildMenuAsync = createAsyncThunk(
  "admin/deleteChildMenu",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/menu/child/name/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteChildMenuAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const childMenuSlice = createSlice({
  name: "childMenu",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createChildMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createChildMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createChildMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getChildMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getChildMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getChildMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateChildMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateChildMenuAsync.fulfilled, (state, action) => {
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

      .addCase(updateChildMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteChildMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteChildMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteChildMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default childMenuSlice.reducer;
