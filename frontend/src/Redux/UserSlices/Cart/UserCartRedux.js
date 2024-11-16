import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

const userToken = localStorage.getItem("clientLoggedToken");

export const createUserCartAsync = createAsyncThunk(
  "user/createUserCart",
  async ({ productId, color_id, PSize_id }) => {
    try {
      const response = await axios.post(
        `${HOSTNAME}/user/carts/cart/`,
        {
          productId,
          color_id,
          PSize_id,
        },

        {
          headers: { Authorization: `${userToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("createUserCartAsync Error - ", error.response);
    }
  }
);

export const getUserCartAsync = createAsyncThunk(
  "user/getUserCart",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/user/carts/cart/`, {
        headers: { Authorization: `${userToken}` },
      });
      return response.data;
    } catch (error) {
      console.log("getUserCartAsync Error - ", error.response);
    }
  }
);

export const updateUserCartQtyAsync = createAsyncThunk(
  "user/updateUserCartQty",
  async ({ cartItem_id, qtyMessage }) => {
    try {
      const response = await axios.patch(
        `${HOSTNAME}/user/carts/cartQty/${cartItem_id}/`,
        { qtyMessage },
        {
          headers: { Authorization: `${userToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("updateUserCartQtyAsync Error - ", error.response);
    }
  }
);

export const deleteUserCartAsync = createAsyncThunk(
  "user/deleteUserCart",
  async ({ cart_id, cartItem_id }) => {
    try {
      // console.log("slice - ", cart_id, cartItem_id);
      const response = await axios.delete(
        `${HOSTNAME}/user/carts/cart/${cart_id}/${cartItem_id}`,
        {
          headers: { Authorization: `${userToken}` },
        }
      );

      return response.data;
    } catch (error) {
      console.log("deleteUserCartAsync Error - ", error.response);
    }
  }
);

const initialState = {
  data: [],
  cartLength: 0,
  isLoading: false,
  isError: false,
};

export const UserCartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(createUserCartAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createUserCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartLength = state.cartLength + 1;
      })

      .addCase(createUserCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserCartAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getUserCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartLength =
          action.payload?.query?.[0]?.userCartUserCartItem?.length || 0;
        state.data = action.payload;
      })

      .addCase(getUserCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateUserCartQtyAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(updateUserCartQtyAsync.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.msg === "success") {
          const { cartItem_id, qtyMessage } = action.meta.arg;

          const cart = state.data.query[0];

          if (cart) {
            const findIndex = cart.userCartUserCartItem.findIndex(
              (data) => data.id === cartItem_id
            );

            if (findIndex !== -1) {
              // console.log("findIndex - ", findIndex, qtyMessage);
              if (qtyMessage === "Increase") {
                // console.log("Qty Increased");
                cart.userCartUserCartItem[findIndex].qty += 1;
              }

              if (qtyMessage === "Decrease") {
                // console.log("Qty Decreased");
                if (cart.userCartUserCartItem[findIndex].qty > 1) {
                  cart.userCartUserCartItem[findIndex].qty -= 1;
                }
              }
            } else {
              console.error("ID not found in the userCartUserCartItem array");
            }
          } else {
            console.error("Cart not found in the state data");
          }
        }
      })

      .addCase(updateUserCartQtyAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteUserCartAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteUserCartAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.meta.arg);

        if (action.payload?.msg === "success") {
          const { cartItem_id } = action.meta.arg;

          const userCartUserCartItem =
            state.data.query?.[0]?.userCartUserCartItem;

          const findIndex = userCartUserCartItem.findIndex((data) => {
            return data.id === cartItem_id;
          });
          userCartUserCartItem.splice(findIndex, 1);

          if (state.cartLength === 1) {
            state.cartLength = 0;
          } else {
            state.cartLength = state.cartLength - 1;
          }
        }
      })

      .addCase(deleteUserCartAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default UserCartSlice.reducer;
