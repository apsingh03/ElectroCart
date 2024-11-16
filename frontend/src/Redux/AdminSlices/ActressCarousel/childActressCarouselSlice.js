import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createChildActressCarouselAsync = createAsyncThunk(
  "admin/createChildActressCarousel",
  async ({ name, imageSrc, imageAlt, routeLink, parent_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/actressCarousel/child/banner`,
        {
          name,
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
      console.log("createChildActressCarouselAsync Error - ", error.response);
    }
  }
);

export const getChildActressCarouselAsync = createAsyncThunk(
  "admin/getChildActressCarousel",
  async () => {
    try {
      // console.log("getChildBannerCarouselAsync");
      const response = await axios.get(
        `${HOSTNAME}/admin/actressCarousel/child/banner`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getChildActressCarouselAsync Error - ", error.response);
    }
  }
);

export const updateChildActressCarouselAsync = createAsyncThunk(
  "admin/updateChildActressCarousel",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/actressCarousel/child/banner/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateChildActressCarouselAsync Error - ", error.response);
    }
  }
);

export const deleteChildActressCarouselAsync = createAsyncThunk(
  "admin/deleteChildActressCarousel",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/actressCarousel/child/banner/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteChildActressCarouselAsync Error - ", error.response);
    }
  }
);

export const childActressCarouselIsFavoriteAsync = createAsyncThunk(
  "admin/childActressCarouselIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/actressCarousel/child/isFavorite/${id}`,
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
        "childActressCarouselIsFavoriteAsync Error - ",
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

export const childActressCarouselSlice = createSlice({
  name: "childActressCarousel",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createChildActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createChildActressCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })
      .addCase(createChildActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getChildActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getChildActressCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getChildActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateChildActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateChildActressCarouselAsync.fulfilled, (state, action) => {
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

      .addCase(updateChildActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteChildActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteChildActressCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteChildActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(childActressCarouselIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(
        childActressCarouselIsFavoriteAsync.fulfilled,
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

      .addCase(
        childActressCarouselIsFavoriteAsync.rejected,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default childActressCarouselSlice.reducer;
