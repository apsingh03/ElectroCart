import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;

export const clientGetCategoryWiseProductAsync = createAsyncThunk(
  "client/clientGetCategoryWiseProduct",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/categoryWiseProduct/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetCategoryWiseProductAsync Error - ", error.response);
    }
  }
);

export const clientAllListedProductsAsync = createAsyncThunk(
  "client/clientAllListedProducts",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/allListedProducts/`
      );
      return response.data;
    } catch (error) {
      console.log("clientAllListedProductsAsync Error - ", error.response);
    }
  }
);

export const clientShowFilteredProductsAsync = createAsyncThunk(
  "client/clientShowFilteredProducts",
  async ({ filters }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/filteredProducts`,
        {
          params: filters,
        }
      );
      return response.data;
    } catch (error) {
      console.log("clientShowFilteredProductsAsync Error - ", error.response);
    }
  }
);

export const clientGetSingleProductAsync = createAsyncThunk(
  "client/clientGetSingleProduct",
  async ({ id }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/singleProduct/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetSingleProductAsync Error - ", error.response);
    }
  }
);

export const clientGetProductFiltersAsync = createAsyncThunk(
  "client/clientGetProductFilters",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/productFilters/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetProductFiltersAsync Error - ", error.response);
    }
  }
);

export const clientGetMenuAsync = createAsyncThunk(
  "client/clientGetMenu",
  async () => {
    try {
      const response = await axios.get(`${HOSTNAME}/client/product/getMenu/`);
      return response.data;
    } catch (error) {
      console.log("clientGetMenuAsync Error - ", error.response);
    }
  }
);

export const clientGetSizesFiltersAsync = createAsyncThunk(
  "client/clientGetSizesFilters",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/sizesFilters/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetSizesFiltersAsync Error - ", error.response);
    }
  }
);

export const clientGetBannerCarouselAsync = createAsyncThunk(
  "client/clientGetBannerCarousel",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/bannerCarousel/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetBannerCarouselAsync Error - ", error.response);
    }
  }
);

export const clientGetActressCarouselAsync = createAsyncThunk(
  "client/clientGetActressCarousel",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/actressCarousel/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetActressCarouselAsync Error - ", error.response);
    }
  }
);

export const clientGetTestimonialAsync = createAsyncThunk(
  "client/clientGetTestimonial",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/testimonial/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetTestimonialAsync Error - ", error.response);
    }
  }
);

export const clientGetFourBannerImagesAsync = createAsyncThunk(
  "client/clientGetFourBannerImages",
  async () => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/client/product/fourBannerImages/`
      );
      return response.data;
    } catch (error) {
      console.log("clientGetFourBannerImagesAsync Error - ", error.response);
    }
  }
);

const initialState = {
  categoryWiseProducts: [],
  allProducts: [],
  singleProduct: [],
  productFilters: [],
  headerMenu: [],
  sizesFilters: [],
  bannerCarousel: [],
  actressCarousel: [],
  testimonial: [],
  fourBannerImages: [],
  isLoading: false,
  isError: false,
};

export const clientProductSlice = createSlice({
  name: "clientProduct",
  initialState,
  reducers: {
    sortNewestFirstAllProducts(state, action) {
      // console.log("sortNewestFirstAllProducts");

      const sortedProducts = state.allProducts.query.sort((a, b) => {
        return b.id - a.id;
      });

      state.allProducts.query = sortedProducts;
    },

    sortOldestFirstAllProducts(state, action) {
      // console.log("sortOldestFirstAllProducts");

      const sortedProducts = state.allProducts.query.sort((a, b) => {
        return a.id - b.id;
      });

      state.allProducts.query = sortedProducts;
    },

    sortPriceHighToLowProducts(state, action) {
      // console.log("sortPriceHighToLowProducts");

      // Sort each product's sizes by MRP in descending order
      state.allProducts.query.forEach((product) => {
        product.productSizesProduct.sort((a, b) => b.mrp - a.mrp);
      });

      // Sort all products by the highest MRP in their productSizesProduct array
      state.allProducts.query.sort((a, b) => {
        const maxMrpA = Math.max(
          ...a.productSizesProduct.map((size) => size.mrp)
        );
        const maxMrpB = Math.max(
          ...b.productSizesProduct.map((size) => size.mrp)
        );
        return maxMrpB - maxMrpA;
      });
    },

    sortPriceLowToHighProducts(state, action) {
      // Sort each product's sizes by MRP in ASC order
      state.allProducts?.query.forEach((product) => {
        product.productSizesProduct.sort((a, b) => a.mrp - b.mrp);
      });

      // Sort all products by the Lowest MRP in their productSizesProduct array
      state.allProducts?.query.sort((a, b) => {
        const maxMrpA = Math.min(
          ...a.productSizesProduct.map((size) => size.mrp)
        );
        const maxMrpB = Math.min(
          ...b.productSizesProduct.map((size) => size.mrp)
        );
        return maxMrpA - maxMrpB;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(clientGetCategoryWiseProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetCategoryWiseProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryWiseProducts = action.payload;
      })
      .addCase(clientGetCategoryWiseProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(clientAllListedProductsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientAllListedProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(clientAllListedProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientShowFilteredProductsAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientShowFilteredProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(clientShowFilteredProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetProductFiltersAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetProductFiltersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productFilters = action.payload;
      })
      .addCase(clientGetProductFiltersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetSingleProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetSingleProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(clientGetSingleProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetMenuAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetMenuAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.headerMenu = action.payload;
      })
      .addCase(clientGetMenuAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetSizesFiltersAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetSizesFiltersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sizesFilters = action.payload;
      })
      .addCase(clientGetSizesFiltersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(clientGetBannerCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetBannerCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bannerCarousel = action.payload;
      })
      .addCase(clientGetBannerCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(clientGetActressCarouselAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetActressCarouselAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.actressCarousel = action.payload;
      })
      .addCase(clientGetActressCarouselAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(clientGetTestimonialAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetTestimonialAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonial = action.payload;
      })
      .addCase(clientGetTestimonialAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(clientGetFourBannerImagesAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(clientGetFourBannerImagesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fourBannerImages = action.payload;
      })
      .addCase(clientGetFourBannerImagesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const {
  sortNewestFirstAllProducts,
  sortOldestFirstAllProducts,
  sortPriceHighToLowProducts,
  sortPriceLowToHighProducts,
} = clientProductSlice.actions;
export default clientProductSlice.reducer;
