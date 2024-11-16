const express = require("express");
const router = express.Router();

const parentBannerCarouselController = require("../../../controller/admin/BannerCarousel/ParentBannerCarouselController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/banner",
  middleware.authenticateAdmin,
  parentBannerCarouselController.getParentBannerCarousel
);

router.post(
  "/banner",
  middleware.authenticateAdmin,
  parentBannerCarouselController.createParentBannerCarousel
);

router.patch(
  "/banner/:id",
  middleware.authenticateAdmin,
  parentBannerCarouselController.updateParentBannerCarousel
);

router.delete(
  "/banner/:id",
  middleware.authenticateAdmin,
  parentBannerCarouselController.deleteParentBannerCarousel
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  parentBannerCarouselController.bannerCarouselIsFavorite
);

module.exports = router;
