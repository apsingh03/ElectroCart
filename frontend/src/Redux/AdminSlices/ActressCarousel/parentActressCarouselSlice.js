import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createParentActressCarouselAsync = createAsyncThunk(
  "admin/createParentActressCarousel",
  async ({ name, animation, timer, width, height, objectFit }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/actressCarousel/parent/banner`,
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
      console.log("createParentActressCarouselAsync Error - ", error.response);
    }
  }
);

export const getParentActressCarouselAsync = createAsyncThunk(
  "admin/getParentActressCarousel",
  async () => {
    try {
      // console.log(" getParentBannerCarouselAsync  ");

      const response = await axios.get(
        `${HOSTNAME}/admin/actressCarousel/parent/banner`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getParentActressCarouselAsync Error - ", error.response);
    }
  }
);

export const updateParentActressCarouselAsync = createAsyncThunk(
  "admin/updateParentActressCarousel",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/actressCarousel/parent/banner/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateParentActressCarouselAsync Error - ", error.response);
    }
  }
);

export const deleteParentActressCarouselAsync = createAsyncThunk(
  "admin/deleteParentActressCarousel",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/actressCarousel/parent/banner/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteParentActressCarouselAsync Error - ", error.response);
    }
  }
);

export const actressCarouselIsFavoriteAsync = createAsyncThunk(
  "admin/actressCarouselIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/actressCarousel/parent/isFavorite/${id}`,
        {
          isFavoriteStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("actressCarouselIsFavoriteAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const parentActressCarouselSlice = createSlice({
  name: "actressCarousel",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createParentActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createParentActressCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })
      .addCase(createParentActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getParentActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getParentActressCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getParentActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateParentActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateParentActressCarouselAsync.fulfilled, (state, action) => {
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

      .addCase(updateParentActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteParentActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteParentActressCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteParentActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(actressCarouselIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(actressCarouselIsFavoriteAsync.fulfilled, (state, action) => {
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

      .addCase(actressCarouselIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default parentActressCarouselSlice.reducer;
