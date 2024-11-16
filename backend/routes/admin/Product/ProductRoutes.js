const express = require("express");
const router = express.Router();

const ProductController = require("../../../controller/admin/Product/ProductController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/product",
  middleware.authenticateAdmin,
  ProductController.getProduct
);

router.get(
  "/isProductTitleExist/:productTitle",
  middleware.authenticateAdmin,
  ProductController.isProductTitleExist
);

router.post(
  "/product",
  middleware.authenticateAdmin,
  ProductController.createProduct
);

router.patch(
  "/product/:id",
  middleware.authenticateAdmin,
  ProductController.updateProduct
);

router.delete(
  "/product/:id",
  middleware.authenticateAdmin,
  ProductController.deleteProduct
);

// Features routes
router.patch(
  "/isPublished/:id",
  middleware.authenticateAdmin,
  ProductController.productIsPublished
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  ProductController.productIsFavorite
);

router.patch(
  "/isRecycleBin/:id",
  middleware.authenticateAdmin,
  ProductController.productIsRecycleBin
);

module.exports = router;
