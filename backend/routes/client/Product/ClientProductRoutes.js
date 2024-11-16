const express = require("express");
const router = express.Router();

const controller = require("../../../controller/client/Product/clientProductController.js");

// client/product/CurrentRoutes
router.get("/categoryWiseProduct", controller.clientGetCategoryWiseProduct);

router.get("/allListedProducts", controller.clientAllListedProducts);
router.get("/filteredProducts", controller.clientShowFilteredProducts);
router.get("/singleProduct/:id", controller.clientGetSingleProduct);
router.get("/productFilters", controller.clientGetProductFilters);
router.get("/getMenu", controller.clientGetMenuAsync);
router.get("/sizesFilters", controller.clientGetSizesFilters);
router.get("/bannerCarousel", controller.clientGetBannerCarousel);
router.get("/actressCarousel", controller.clientGetActressCarousel);
router.get("/testimonial", controller.clientGetTestimonial);
router.get("/fourBannerImages", controller.clientGetFourBannerImages);

module.exports = router;
