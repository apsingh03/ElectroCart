import { configureStore } from "@reduxjs/toolkit";
// Client
import userAuthSlice from "./UserSlices/UserAuth";
// Admin
import adminAuthSlice from "./AdminSlices/adminAuth";
import parentFilterSlice from "./AdminSlices/Filter/parentFilterSlice";
import childFilterSlice from "./AdminSlices/Filter/childFilterSlice";
import parentMenuSlice from "./AdminSlices/Menu/parentMenuSlice";
import childMenuSlice from "./AdminSlices/Menu/childMenuSlice";
import productSizeSlice from "./AdminSlices/Sizes/SizesSlice";
import categorySlice from "./AdminSlices/Category/CategorySlice";
import colorSlice from "./AdminSlices/Color/ColorSlice";
import fabricSlice from "./AdminSlices/Fabric/FabricSlice";
import productSlice from "./AdminSlices/Product/ProductSlice";
import clientProductSlice from "./ClientSlices/clientProductSlice";
import UserCartSlice from "./UserSlices/Cart/UserCartRedux";
import ordersSlice from "./AdminSlices/Orders/OrderSlice";
import parentBannerCarouselSlice from "./AdminSlices/BannerCarousel/parentBannerCarouselSlice";
import childBannerCarouselSlice from "./AdminSlices/BannerCarousel/childBannerCarouselSlice";
import parentActressCarouselSlice from "./AdminSlices/ActressCarousel/parentActressCarouselSlice";
import childActressCarouselSlice from "./AdminSlices/ActressCarousel/childActressCarouselSlice";
import parentTestimonialSlice from "./AdminSlices/Testimonial/parentTestimonialSlice";
import childTestimonialSlice from "./AdminSlices/Testimonial/childTestimonialSlice";
import fourImagesBannerSlice from "./AdminSlices/FourImagesBanner/FourImagesBannerSlice";
import favoriteProductSlice from "./UserSlices/FavoriteProduct/FavoriteProductSlice";
import clientDebounceSearchSlice from "./ClientSlices/clientDebounceSearchSlice";
import parentCategoryBrandSlice from "./AdminSlices/CategoryBrand/parentCategoryBrandSlice";
import childCategoryBrandSlice from "./AdminSlices/CategoryBrand/childCategoryBrandSlice";

export const store = configureStore({
  reducer: {
    // Admin Slices
    admin_auth: adminAuthSlice,
    admin_parentFilter: parentFilterSlice,
    admin_childFilter: childFilterSlice,
    admin_parentMenu: parentMenuSlice,
    admin_childMenu: childMenuSlice,
    admin_productSize: productSizeSlice,
    admin_category: categorySlice,
    admin_color: colorSlice,
    admin_fabric: fabricSlice,
    admin_product: productSlice,
    admin_orders: ordersSlice,
    admin_parentBannerCarousel: parentBannerCarouselSlice,
    admin_childBannerCarousel: childBannerCarouselSlice,
    admin_parentActressCarousel: parentActressCarouselSlice,
    admin_childActressCarousel: childActressCarouselSlice,
    admin_parentTestimonial: parentTestimonialSlice,
    admin_childTestimonial: childTestimonialSlice,
    admin_fourImagesBanner: fourImagesBannerSlice,
    admin_parentCategoryBrand: parentCategoryBrandSlice,
    admin_childCategoryBrand: childCategoryBrandSlice,

    // Client Slices
    client_product: clientProductSlice,
    client_debounceSearch: clientDebounceSearchSlice,

    // User Slices
    client_auth: userAuthSlice,
    user_userCart: UserCartSlice,
    user_favoriteProduct: favoriteProductSlice,
  },
});
