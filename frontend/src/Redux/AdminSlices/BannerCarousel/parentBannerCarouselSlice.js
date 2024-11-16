import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createParentBannerCarouselAsync = createAsyncThunk(
  "admin/createParentBannerCarousel",
  async ({ name, animation, timer, width, height, objectFit }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/bannerCarousel/parent/banner`,
        {
          name,
          animation,
          timer,
          width,
          height,
          objectFit,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createParentBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const getParentBannerCarouselAsync = createAsyncThunk(
  "admin/getParentBannerCarousel",
  async () => {
    try {
      console.log(" getParentBannerCarouselAsync  ");

      const response = await axios.get(
        `${HOSTNAME}/admin/bannerCarousel/parent/banner`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getParentBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const updateParentBannerCarouselAsync = createAsyncThunk(
  "admin/updateParentBannerCarousel",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/bannerCarousel/parent/banner/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateParentBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const deleteParentBannerCarouselAsync = createAsyncThunk(
  "admin/deleteParentBannerCarousel",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/bannerCarousel/parent/banner/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteParentBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const bannerCarouselIsFavoriteAsync = createAsyncThunk(
  "admin/bannerCarouselIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/bannerCarousel/parent/isFavorite/${id}`,
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

export const parentBannerCarouselSlice = createSlice({
  name: "bannerCarousel",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createParentBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createParentBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })
      .addCase(createParentBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getParentBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getParentBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getParentBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateParentBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateParentBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id, updatedData } = action.meta.arg;

          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            console.log("--> ", action.meta.arg);

            Object.entries(updatedData).forEach(([key, value]) => {
              state.data.query[findIndex][key] = value;
            });

            // state.data.query[findIndex].name = action.payload.query.name;
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(updateParentBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteParentBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteParentBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteParentBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(bannerCarouselIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(bannerCarouselIsFavoriteAsync.fulfilled, (state, action) => {
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

      .addCase(bannerCarouselIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default parentBannerCarouselSlice.reducer;
