import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createCategoryAsync = createAsyncThunk(
  "admin/createCategory",
  async ({ name }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/categories/category/`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createCategoryAsync Error - ", error.response);
    }
  }
);

export const getCategoryAsync = createAsyncThunk(
  "admin/getCategory",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/admin/categories/category/`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getCategoryAsync Error - ", error.response);
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "admin/updateCategory",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/categories/category/${id}`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateCategoryAsync Error - ", error.response);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "admin/deleteCategory",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/categories/category/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteCategoryAsync Error - ", error.response);
    }
  }
);

export const categoryIsFavoriteAsync = createAsyncThunk(
  "admin/categoryIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/categories/isFavorite/${id}`,
        {
          isFavoriteStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("productIsFavoriteAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createCategoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCategoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateCategoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
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

      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteCategoryAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(categoryIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(categoryIsFavoriteAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg && action.payload.msg === "success") {
          const { id, isFavoriteStatus } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });
          // console.log("payload - ", isFavoriteStatus, " -> ", action.payload);
          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            if (isFavoriteStatus === "favoriteIt") {
              // console.log("favoriteIt");
              state.data.query[findIndex].isFavorite = true;
            }

            if (isFavoriteStatus === "unFavoriteIt") {
              // console.log("unFavoriteIt");
              state.data.query[findIndex].isFavorite = false;
            }
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(categoryIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default categorySlice.reducer;
