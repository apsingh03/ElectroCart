import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createFabricAsync = createAsyncThunk(
  "admin/createFabric",
  async ({ name }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/fabrics/fabric/`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createFabricAsync Error - ", error.response);
    }
  }
);

export const getFabricAsync = createAsyncThunk("admin/getFabric", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/admin/fabrics/fabric/`, {
      headers: { Authorization: `${adminToken}` },
    });
    return response.data;
  } catch (error) {
    console.log("getFabricAsync Error - ", error.response);
  }
});

export const updateFabricAsync = createAsyncThunk(
  "admin/updateFabric",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/fabrics/fabric/${id}`,
        {
          name,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateFabricAsync Error - ", error.response);
    }
  }
);

export const deleteFabricAsync = createAsyncThunk(
  "admin/deleteFabric",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/fabrics/fabric/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteFabricAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const fabricSlice = createSlice({
  name: "fabric",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createFabricAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createFabricAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createFabricAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getFabricAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getFabricAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getFabricAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateFabricAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateFabricAsync.fulfilled, (state, action) => {
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

      .addCase(updateFabricAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteFabricAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteFabricAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteFabricAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default fabricSlice.reducer;
