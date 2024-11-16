import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createProductSizeAsync = createAsyncThunk(
  "admin/createParentMenu",
  async ({ name }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/sizes/size/`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createProductSizeAsync Error - ", error.response);
    }
  }
);

export const getProductSizeAsync = createAsyncThunk(
  "admin/getParentMenu",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/admin/sizes/size/`, {
        headers: { Authorization: `${adminToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getProductSizeAsync Error - ", error.response);
    }
  }
);

export const updateProductSizeAsync = createAsyncThunk(
  "admin/updateParentMenu",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/sizes/size/${id}`,
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

export const deleteProductSizeAsync = createAsyncThunk(
  "admin/deleteParentMenu",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/sizes/size/${id}`,
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

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const productSizeSlice = createSlice({
  name: "productSize",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createProductSizeAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createProductSizeAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createProductSizeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getProductSizeAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getProductSizeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getProductSizeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateProductSizeAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateProductSizeAsync.fulfilled, (state, action) => {
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

      .addCase(updateProductSizeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteProductSizeAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteProductSizeAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteProductSizeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSizeSlice.reducer;
