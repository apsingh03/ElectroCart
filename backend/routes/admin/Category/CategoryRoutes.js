const express = require("express");
const router = express.Router();

const CategoryController = require("../../../controller/admin/Category/CategoryController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/ca/parent/name
router.get(
  "/category",
  middleware.authenticateAdmin,
  CategoryController.getCategory
);

router.post(
  "/category",
  middleware.authenticateAdmin,
  CategoryController.createCategory
);

router.patch(
  "/category/:id",
  middleware.authenticateAdmin,
  CategoryController.updateCategory
);

router.delete(
  "/category/:id",
  middleware.authenticateAdmin,
  CategoryController.deleteCategory
);

router.patch(
  "/isFavorite/:id",
  middleware.authenticateAdmin,
  CategoryController.categoryIsFavorite
);


module.exports = router;
