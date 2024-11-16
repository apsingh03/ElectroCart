import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createChildTestimonialAsync = createAsyncThunk(
  "admin/createChildTestimonial",
  async ({ customerName, imageSrc, imageAlt, customerMsg, parent_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/testimonial/child/testimonial`,
        {
          customerName,
          imageSrc,
          imageAlt,
          customerMsg,
          parent_id,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createChildTestimonialAsync Error - ", error.response);
    }
  }
);

export const getChildTestimonialAsync = createAsyncThunk(
  "admin/getChildTestimonial",
  async () => {
    try {
      // console.log("getChildBannerCarouselAsync");
      const response = await axios.get(
        `${HOSTNAME}/admin/testimonial/child/testimonial`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getChildTestimonialAsync Error - ", error.response);
    }
  }
);

export const updateChildTestimonialAsync = createAsyncThunk(
  "admin/updateChildTestimonial",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/testimonial/child/testimonial/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateChildTestimonialAsync Error - ", error.response);
    }
  }
);

export const deleteChildTestimonialAsync = createAsyncThunk(
  "admin/deleteChildTestimonial",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/testimonial/child/testimonial/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteChildTestimonialAsync Error - ", error.response);
    }
  }
);

export const childTestimonialIsFavoriteAsync = createAsyncThunk(
  "admin/childTestimonialIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/testimonial/child/isFavorite/${id}`,
        {
          isFavoriteStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("childTestimonialIsFavoriteAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const childTestimonialSlice = createSlice({
  name: "childTestimonial",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createChildTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createChildTestimonialAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })
      .addCase(createChildTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getChildTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getChildTestimonialAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getChildTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateChildTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateChildTestimonialAsync.fulfilled, (state, action) => {
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

      .addCase(updateChildTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteChildTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteChildTestimonialAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteChildTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(childTestimonialIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(childTestimonialIsFavoriteAsync.fulfilled, (state, action) => {
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

      .addCase(childTestimonialIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default childTestimonialSlice.reducer;
