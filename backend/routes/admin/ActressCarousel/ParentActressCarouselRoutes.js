const express = require("express");
const router = express.Router();

const parentBannerCarouselController = require("../../../controller/admin/ActressCarousel/ParentActressCarouselController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/banner",
  middleware.authenticateAdmin,
  parentBannerCarouselController.getParentActressCarousel
);

router.post(
  "/banner",
  middleware.authenticateAdmin,
  parentBannerCarouselController.createParentActressCarousel
);

router.patch(
  "/banner/:id",
  middleware.authenticateAdmin,
  parentBannerCarouselController.updateParentActressCarousel
);

router.delete(
  "/banner/:id",
  middleware.authenticateAdmin,
  parentBannerCarouselController.deleteParentActressCarousel
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  parentBannerCarouselController.actressCarouselIsFavorite
);

module.exports = router;
