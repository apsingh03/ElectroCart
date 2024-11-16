import { jwtDecode } from "jwt-decode";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const adminToken = localStorage.getItem("adminLoggedToken");

export const getOrdersAsync = createAsyncThunk("order/getOrder", async () => {
  try {
    const response = await axios.get(`${HOSTNAME}/admin/orders/order/`, {
      headers: { Authorization: `${adminToken}` },
    });

    return response.data;
  } catch (error) {
    console.log("getOrdersAsync Error - ", error.response);
  }
});

export const updateDeliveryStatusAsync = createAsyncThunk(
  "order/updateOrdersDelivery",
  async ({ deliveryStatus, cartId }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/admin/orders/deliveryStatus/`,
        { deliveryStatus, cartId },
        {
          headers: { Authorization: `${adminToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateDeliveryStatusAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(getOrdersAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getOrdersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateDeliveryStatusAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateDeliveryStatusAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log("payload - ", action);
        if (action.payload?.msg === "success") {
          const { cartId, deliveryStatus } = action.meta.arg;
          const findIndex = state.data.query.findIndex((data) => {
            return data.id === cartId;
          });
          // console.log("payload - ", action.payload.query);
          // Ensure the findIndex is valid
          if (findIndex !== -1) {
            state.data.query[findIndex].deliveryStatus = deliveryStatus;
          } else {
            console.error("ID not found in the query array");
          }
        }
      })

      .addCase(updateDeliveryStatusAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default ordersSlice.reducer;
