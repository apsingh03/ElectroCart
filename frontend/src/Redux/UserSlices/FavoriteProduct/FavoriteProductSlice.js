import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const userToken = localStorage.getItem("clientLoggedToken");

export const createUserFavoriteProductAsync = createAsyncThunk(
  "user/createUserFavoriteProduct",
  async ({ product_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/user/account/favorite/`,
        {
          product_id,
        },

        {
          headers: { Authorization: `${userToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createUserFavoriteProductAsync Error - ", error.response);
    }
  }
);

export const getUserFavoriteProductAsync = createAsyncThunk(
  "user/getUserFavoriteProduct",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/user/account/favorite/`, {
        headers: { Authorization: `${userToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getUserFavoriteProductAsync Error - ", error.response);
    }
  }
);

export const deleteUserFavoriteProductAsync = createAsyncThunk(
  "user/deleteUserFavoriteProduct",
  async ({ wishList_id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/user/account/favorite/${wishList_id}`,
        {
          headers: { Authorization: `${userToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteUserFavoriteProductAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  favoriteLength: 0,
  isLoading: false,
  isError: false,
};

export const favoriteProductSlice = createSlice({
  name: "favoriteProduct",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createUserFavoriteProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createUserFavoriteProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteLength = state.favoriteLength + 1;
      })

      .addCase(createUserFavoriteProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserFavoriteProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getUserFavoriteProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favoriteLength = state.data?.query?.length || 0;
        state.data = action.payload;
      })

      .addCase(getUserFavoriteProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteUserFavoriteProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteUserFavoriteProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.meta.arg);

        console.log(action.payload);

        if (action.payload?.msg === "success") {
          const { wishList_id } = action.meta.arg;

          const findIndex = state.data?.query.findIndex((data) => {
            return data.id === wishList_id;
          });
          state.data?.query.splice(findIndex, 1);

          if (state.cartLength === 1) {
            state.favoriteLength = 0;
          } else {
            state.favoriteLength = state.favoriteLength - 1;
          }
        }
      })

      .addCase(deleteUserFavoriteProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default favoriteProductSlice.reducer;
