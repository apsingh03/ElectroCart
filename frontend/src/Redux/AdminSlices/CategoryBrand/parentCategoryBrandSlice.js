import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createParentCategoryBrandAsync = createAsyncThunk(
  "admin/createParentCategoryBrand",
  async ({ name }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/categoryBrand/parent/name`,
        {
          name,
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

export const getParentCategoryBrandAsync = createAsyncThunk(
  "admin/getParentCategoryBrand",
  async () => {
    try {
      // console.log("GET REQUEST getParentCategoryBrandAsync ");
      const response = await axios.get(
        `${HOSTNAME}/admin/categoryBrand/parent/name`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getParentMenuAsync Error - ", error.response);
    }
  }
);

export const updateParentCategoryBrandAsync = createAsyncThunk(
  "admin/updateParentCategoryBrand",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/categoryBrand/parent/name/${id}`,
        {
          name,
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

export const deleteParentCategoryBrandAsync = createAsyncThunk(
  "admin/deleteParentCategoryBrand",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/categoryBrand/parent/name/${id}`,
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

export const parentCategoryBrandSlice = createSlice({
  name: "parentCategoryBrand",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createParentCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createParentCategoryBrandAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createParentCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getParentCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getParentCategoryBrandAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getParentCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateParentCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateParentCategoryBrandAsync.fulfilled, (state, action) => {
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

      .addCase(updateParentCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteParentCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteParentCategoryBrandAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteParentCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default parentCategoryBrandSlice.reducer;
