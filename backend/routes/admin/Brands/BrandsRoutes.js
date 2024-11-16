const express = require("express");
const router = express.Router();

const BrandsController = require("../../../controller/admin/Brands/BrandsController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get("/brand", middleware.authenticateAdmin, BrandsController.getFabric);

router.post(
  "/brand",
  middleware.authenticateAdmin,
  BrandsController.createFabric
);

router.patch(
  "/brand/:id",
  middleware.authenticateAdmin,
  BrandsController.updateFabric
);

router.delete(
  "/brand/:id",
  middleware.authenticateAdmin,
  BrandsController.deleteFabric
);

module.exports = router;
