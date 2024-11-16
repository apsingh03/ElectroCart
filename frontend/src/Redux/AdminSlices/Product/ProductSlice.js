import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createProductAsync = createAsyncThunk(
  "admin/createProduct",
  async ({
    productTitle,
    productCategory,
    productCategoryBrand,
    productColor,
    productDesc,
    productSize,
    productImages,
  }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/products/product/`,
        {
          productTitle,
          productCategory,
          productCategoryBrand,
          productColor,
          productDesc,
          productSize,
          productImages,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createProductAsync Error - ", error.response);
    }
  }
);

export const getProductAsync = createAsyncThunk(
  "admin/getProduct",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/admin/products/product/`, {
        headers: { Authorization: `${adminToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getProductSizeAsync Error - ", error.response);
    }
  }
);

export const isProductTitleExistAsync = createAsyncThunk(
  "admin/isProductTitleExist",
  async ({ productTitle }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/admin/products/isProductTitleExist/${productTitle}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("isProductTitleExistAsync Error - ", error.response);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "admin/updateProduct",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/products/product/${id}`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateProductSizeAsync Error - ", error.response);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "admin/deleteProduct",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/products/product/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteProductSizeAsync Error - ", error.response);
    }
  }
);

export const productIsPublishedAsync = createAsyncThunk(
  "admin/productIsPublished",
  async ({ isPublishStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/products/isPublished/${id}`,
        {
          isPublishStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("productIsPublishedAsync Error - ", error.response);
    }
  }
);

export const productIsFavoriteAsync = createAsyncThunk(
  "admin/productIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/products/isFavorite/${id}`,
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

export const productIsRecycleBinAsync = createAsyncThunk(
  "admin/productIsRecycleBin",
  async ({ isRecycleStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/products/isRecycleBin/${id}`,
        {
          isRecycleStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("productIsRecycleBinAsync Error - ", error.response);
    }
  }
);
const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        // if (action.payload.msg && action.payload.msg === "success") {
        //   state.data.query.unshift(action.payload.query);
        // }
        // console.log("payload - ", action.payload);
      })

      .addCase(createProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateProductAsync.fulfilled, (state, action) => {
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

      .addCase(updateProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(productIsPublishedAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(productIsPublishedAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg && action.payload.msg === "success") {
          const { id, isPublishStatus } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });
          // console.log("payload - ", isPublishStatus, " -> ", action.payload);
          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            if (isPublishStatus === "PublishIt") {
              state.data.query[findIndex].isPublished = true;
            }

            if (isPublishStatus === "unPublishedIt") {
              state.data.query[findIndex].isPublished = false;
            }
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(productIsPublishedAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(productIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(productIsFavoriteAsync.fulfilled, (state, action) => {
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

      .addCase(productIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(productIsRecycleBinAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(productIsRecycleBinAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg && action.payload.msg === "success") {
          const { id, isRecycleStatus } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });
          console.log("payload - ", isRecycleStatus, " -> ", action.payload);
          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            if (isRecycleStatus === "moveIt") {
              // console.log("moveIt");
              state.data.query.splice(findIndex, 1);
            }

            if (isRecycleStatus === "restoreIt") {
              // console.log("restoreIt");
              state.data.query.splice(findIndex, 1);
            }
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(productIsRecycleBinAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
