const express = require("express");
const router = express.Router();

const ProductSizesController = require("../../../controller/admin/Sizes/ProductSizesController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/size",
  middleware.authenticateAdmin,
  ProductSizesController.getProductSize
);

router.post(
  "/size",
  middleware.authenticateAdmin,
  ProductSizesController.createProductSize
);

router.patch(
  "/size/:id",
  middleware.authenticateAdmin,
  ProductSizesController.updateProductSize
);

router.delete(
  "/size/:id",
  middleware.authenticateAdmin,
  ProductSizesController.deleteProductSize
);

module.exports = router;
