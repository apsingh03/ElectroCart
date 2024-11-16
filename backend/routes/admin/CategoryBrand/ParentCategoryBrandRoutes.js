const express = require("express");
const router = express.Router();

const parentCategoryBrandController = require("../../../controller/admin/CategoryBrand/ParentCategoryBrandController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/parent/name
router.get(
  "/name",
  middleware.authenticateAdmin,
  parentCategoryBrandController.getParentCategoryBrand
);

router.post(
  "/name",
  middleware.authenticateAdmin,
  parentCategoryBrandController.createParentCategoryBrand
);

router.patch(
  "/name/:id",
  middleware.authenticateAdmin,
  parentCategoryBrandController.updateParentCategoryBrand
);

router.delete(
  "/name/:id",
  middleware.authenticateAdmin,
  parentCategoryBrandController.deleteParentCategoryBrand
);

module.exports = router;
