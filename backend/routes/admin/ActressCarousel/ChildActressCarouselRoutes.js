const express = require("express");
const router = express.Router();

const controller = require("../../../controller/admin/ActressCarousel/ChildActressCarouselController.js");

const middleware = require("../../../middleware/AdminAuth.js");

router.get(
  "/banner",
  middleware.authenticateAdmin,
  controller.getChildActressCarousel
);

router.post(
  "/banner",
  middleware.authenticateAdmin,
  controller.createChildActressCarousel
);

router.patch(
  "/banner/:id",
  middleware.authenticateAdmin,
  controller.updateChildActressCarousel
);

router.delete(
  "/banner/:id",
  middleware.authenticateAdmin,
  controller.deleteChildActressCarousel
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  controller.childActressCarouselIsFavorite
);

module.exports = router;
