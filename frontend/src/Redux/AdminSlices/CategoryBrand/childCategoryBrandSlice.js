import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createChildCategoryBrandAsync = createAsyncThunk(
  "admin/createChildCategoryBrand",
  async ({ name, parent_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/categoryBrand/child/name`,
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
      console.log("createChildMenuAsync Error - ", error.response);
    }
  }
);

export const getChildCategoryBrandAsync = createAsyncThunk(
  "admin/getChildCategoryBrand",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/admin/categoryBrand/child/name`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getChildMenuAsync Error - ", error.response);
    }
  }
);

export const getChildCategoryBrandByCategoryIdAsync = createAsyncThunk(
  "admin/getChildCategoryBrandByCategoryId",
  async ({ categoryId }) => {
    try {
      // console.log("getChildCategoryBrandByCategoryIdAsync");
      const response = await axios.get(
        `${HOSTNAME}/admin/categoryBrand/child/byCategoryId/${categoryId}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getChildMenuAsync Error - ", error.response);
    }
  }
);

export const updateChildCategoryBrandAsync = createAsyncThunk(
  "admin/updateChildCategoryBrand",
  async ({ name, id, parentId }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/categoryBrand/child/name/${id}`,
        {
          name,
          parentId,
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

export const deleteChildCategoryBrandAsync = createAsyncThunk(
  "admin/deleteChildCategoryBrand",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/categoryBrand/child/name/${id}`,
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

export const childCategoryBrandSlice = createSlice({
  name: "childCategoryBrand",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createChildCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createChildCategoryBrandAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createChildCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getChildCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getChildCategoryBrandAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getChildCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateChildCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateChildCategoryBrandAsync.fulfilled, (state, action) => {
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

      .addCase(updateChildCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteChildCategoryBrandAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteChildCategoryBrandAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteChildCategoryBrandAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(
        getChildCategoryBrandByCategoryIdAsync.pending,
        (state, action) => {
          state.isLoading = true;
        }
      )

      .addCase(
        getChildCategoryBrandByCategoryIdAsync.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )

      .addCase(
        getChildCategoryBrandByCategoryIdAsync.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default childCategoryBrandSlice.reducer;
