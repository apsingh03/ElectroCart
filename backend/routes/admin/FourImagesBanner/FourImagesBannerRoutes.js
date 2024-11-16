const express = require("express");
const router = express.Router();

const controller = require("../../../controller/admin/FourImagesBanner/FourImagesBannerController.js");

const middleware = require("../../../middleware/AdminAuth.js");

router.post(
  "/banner",
  middleware.authenticateAdmin,
  controller.createFourImagesBanner
);

router.get(
  "/banner",
  middleware.authenticateAdmin,
  controller.getFourImagesBanner
);

router.patch(
  "/banner/:id",
  middleware.authenticateAdmin,
  controller.updateFourImagesBanner
);

router.delete(
  "/banner/:id",
  middleware.authenticateAdmin,
  controller.deleteFourImagesBanner
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  controller.fourImagesBannerIsFavorite
);

module.exports = router;
