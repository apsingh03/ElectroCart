import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createChildBannerCarouselAsync = createAsyncThunk(
  "admin/createChildBannerCarousel",
  async ({ imageSrc, imageAlt, routeLink, parent_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/bannerCarousel/child/banner`,
        {
          imageSrc,
          imageAlt,
          routeLink,
          parent_id,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createChildBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const getChildBannerCarouselAsync = createAsyncThunk(
  "admin/getChildBannerCarousel",
  async () => {
    try {
      console.log("getChildBannerCarouselAsync");
      const response = await axios.get(
        `${HOSTNAME}/admin/bannerCarousel/child/banner`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getChildBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const updateChildBannerCarouselAsync = createAsyncThunk(
  "admin/updateChildBannerCarousel",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/bannerCarousel/child/banner/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateChildBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const deleteChildBannerCarouselAsync = createAsyncThunk(
  "admin/deleteChildBannerCarousel",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/bannerCarousel/child/banner/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteChildBannerCarousel Error - ", error.response);
    }
  }
);

export const childBannerCarouselIsFavoriteAsync = createAsyncThunk(
  "admin/childBannerCarouselIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/bannerCarousel/child/isFavorite/${id}`,
        {
          isFavoriteStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log(
        "childBannerCarouselIsFavoriteAsync Error - ",
        error.response
      );
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const childBannerCarouselSlice = createSlice({
  name: "childBannerCarousel",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createChildBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createChildBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })
      .addCase(createChildBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getChildBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getChildBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getChildBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateChildBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateChildBannerCarouselAsync.fulfilled, (state, action) => {
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

      .addCase(updateChildBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteChildBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteChildBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteChildBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(childBannerCarouselIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(
        childBannerCarouselIsFavoriteAsync.fulfilled,
        (state, action) => {
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
        }
      )

      .addCase(childBannerCarouselIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default childBannerCarouselSlice.reducer;
