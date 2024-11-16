import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createFourImagesBannerAsync = createAsyncThunk(
  "admin/createFourImagesBanner",
  async ({ imageSrc, imageAlt, routeLink }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/fourImagesBanner/banner/`,
        {
          imageSrc,
          imageAlt,
          routeLink,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createFourImagesBannerAsync Error - ", error.response);
    }
  }
);

export const getFourImagesBannerAsync = createAsyncThunk(
  "admin/getFourImagesBanner",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/admin/fourImagesBanner/banner/`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getFourImagesBannerAsync Error - ", error.response);
    }
  }
);

export const updateFourImagesBannerAsync = createAsyncThunk(
  "admin/updateFourImagesBanner",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/fourImagesBanner/banner/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateFourImagesBannerAsync Error - ", error.response);
    }
  }
);

export const deleteFourImagesBannerAsync = createAsyncThunk(
  "admin/deleteFourImagesBanner",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/fourImagesBanner/banner/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteFourImagesBannerAsync Error - ", error.response);
    }
  }
);

export const fourImagesBannerIsFavoriteAsync = createAsyncThunk(
  "admin/fourImagesBannerIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/fourImagesBanner/isFavorite/${id}`,
        {
          isFavoriteStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("fourImagesBannerIsFavoriteAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const fourImagesBannerSlice = createSlice({
  name: "fourImagesBanner",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createFourImagesBannerAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createFourImagesBannerAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createFourImagesBannerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getFourImagesBannerAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getFourImagesBannerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getFourImagesBannerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateFourImagesBannerAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateFourImagesBannerAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id, updatedData } = action.meta.arg;

          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            // console.log("--> ", action.meta.arg);

            Object.entries(updatedData).forEach(([key, value]) => {
              state.data.query[findIndex][key] = value;
            });

            // state.data.query[findIndex].name = action.payload.query.name;
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(updateFourImagesBannerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteFourImagesBannerAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteFourImagesBannerAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteFourImagesBannerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fourImagesBannerIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(fourImagesBannerIsFavoriteAsync.fulfilled, (state, action) => {
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

      .addCase(fourImagesBannerIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default fourImagesBannerSlice.reducer;
