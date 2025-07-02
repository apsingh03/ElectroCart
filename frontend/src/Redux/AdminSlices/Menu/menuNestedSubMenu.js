import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const createMenuNestedSubMenuAsync = createAsyncThunk(
  "admin/createMenuNestedSubMenu",
  async ({ name, routeLink, parent_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/admin/menu/menuNestedSubMenu/name`,
        {
          name,
          routeLink,
          parent_id,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createMenuNestedSubMenuAsync Error - ", error.response);
    }
  }
);

export const getMenuNestedSubMenuAsync = createAsyncThunk(
  "admin/getMenuNestedSubMenu",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/admin/menu/menuNestedSubMenu/name`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.log("getMenuNestedSubMenuAsync Error - ", error.response);
    }
  }
);

// export const getNullParentMenu = createAsyncThunk(
//   "admin/menuNestedSubMenu",
//   async () => {
//     try {
//       const response = await axios.get(
//         `${HOSTNAME}/admin/menu/menuNestedSubMenu/nullParentMenu`,
//         {
//           headers: { Authorization: `${adminToken}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.log("getMenuNestedSubMenuAsync Error - ", error.response);
//     }
//   }
// );

export const updateMenuNestedSubMenuAsync = createAsyncThunk(
  "admin/updateMenuNestedSubMenu",
  async ({ updatedData, id }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/menu/menuNestedSubMenu/name/${id}`,
        {
          updatedData,
        },

        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateMenuNestedSubMenuAsync Error - ", error.response);
    }
  }
);

export const deleteMenuNestedSubMenuAsync = createAsyncThunk(
  "admin/deleteMenuNestedSubMenu",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${HOSTNAME}/admin/menu/menuNestedSubMenu/name/${id}`,
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteMenuNestedSubMenuAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const menuNestedSubMenuSlice = createSlice({
  name: "menuNestedSubMenu",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createMenuNestedSubMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createMenuNestedSubMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          state.data.query.unshift(action.payload.query);
        }
        // console.log("payload - ", action.payload);
      })

      .addCase(createMenuNestedSubMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getMenuNestedSubMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getMenuNestedSubMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getMenuNestedSubMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      // update
      .addCase(updateMenuNestedSubMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateMenuNestedSubMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            state.data.query[findIndex].name = action.payload.query.name;
            state.data.query[findIndex].routeLink =
              action.payload.query.routeLink;
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(updateMenuNestedSubMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteMenuNestedSubMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteMenuNestedSubMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload.msg === "success") {
          const { id } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === id;
          });

          state.data.query.splice(findIndex, 1);
        }
      })

      .addCase(deleteMenuNestedSubMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default menuNestedSubMenuSlice.reducer;
