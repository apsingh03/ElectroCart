const express = require("express");
const router = express.Router();

const controller = require("../../../controller/admin/BannerCarousel/ChildBannerCarouselController.js");

const middleware = require("../../../middleware/AdminAuth.js");

router.get(
  "/banner",
  middleware.authenticateAdmin,
  controller.getChildBannerCarousel
);

router.post(
  "/banner",
  middleware.authenticateAdmin,
  controller.createChildBannerCarousel
);

router.patch(
  "/banner/:id",
  middleware.authenticateAdmin,
  controller.updateChildBannerCarousel
);

router.delete(
  "/banner/:id",
  middleware.authenticateAdmin,
  controller.deleteChildBannerCarousel
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  controller.childBannerCarouselIsFavorite
);

module.exports = router;
