const express = require("express");
const router = express.Router();

const ColorController = require("../../../controller/admin/Color/ColorController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get("/color", middleware.authenticateAdmin, ColorController.getColor);

router.post(
  "/color",
  middleware.authenticateAdmin,
  ColorController.createColor
);

router.patch(
  "/color/:id",
  middleware.authenticateAdmin,
  ColorController.updateColor
);

router.delete(
  "/color/:id",
  middleware.authenticateAdmin,
  ColorController.deleteColor
);

module.exports = router;
