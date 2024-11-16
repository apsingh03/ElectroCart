import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createParentTestimonialAsync = createAsyncThunk(
  "admin/createParentTestimonial",
  async ({ name, animation, timer, width, height, objectFit }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/testimonial/parent/testimonial`,
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
      console.log("createParentTestimonialAsync Error - ", error.response);
    }
  }
);

export const getParentTestimonialAsync = createAsyncThunk(
  "admin/getParentTestimonial",
  async () => {
    try {
      // console.log(" getParentTestimonialAsync  ");

      const response = await axios.get(
        `${HOSTNAME}/admin/testimonial/parent/testimonial`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getParentTestimonialAsync Error - ", error.response);
    }
  }
);

export const updateParentTestimonialAsync = createAsyncThunk(
  "admin/updateParentTestimonial",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/testimonial/parent/testimonial/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateParentTestimonialAsync Error - ", error.response);
    }
  }
);

export const deleteParentTestimonialAsync = createAsyncThunk(
  "admin/deleteParentTestimonial",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/testimonial/parent/testimonial/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteParentTestimonialAsync Error - ", error.response);
    }
  }
);

export const testimonialIsFavoriteAsync = createAsyncThunk(
  "admin/testimonialIsFavorite",
  async ({ isFavoriteStatus, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/testimonial/parent/isFavorite/${id}`,
        {
          isFavoriteStatus,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("testimonialIsFavoriteAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const parentTestimonialSlice = createSlice({
  name: "parentTestimonial",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createParentTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createParentTestimonialAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })
      .addCase(createParentTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getParentTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getParentTestimonialAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getParentTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateParentTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateParentTestimonialAsync.fulfilled, (state, action) => {
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

      .addCase(updateParentTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteParentTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteParentTestimonialAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteParentTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(testimonialIsFavoriteAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(testimonialIsFavoriteAsync.fulfilled, (state, action) => {
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

      .addCase(testimonialIsFavoriteAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default parentTestimonialSlice.reducer;
