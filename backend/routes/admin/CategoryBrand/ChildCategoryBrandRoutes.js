const express = require("express");
const router = express.Router();

const childCategoryBrandController = require("../../../controller/admin/CategoryBrand/ChildCategoryBrandController.js");

const middleware = require("../../../middleware/AdminAuth.js");

// admin/filter/child/name

router.post(
  "/name",
  middleware.authenticateAdmin,
  childCategoryBrandController.createChildCategoryBrand
);

router.get(
  "/name",
  middleware.authenticateAdmin,
  childCategoryBrandController.getChildCategoryBrand
);

router.patch(
  "/name/:id",
  middleware.authenticateAdmin,
  childCategoryBrandController.updateChildCategoryBrand
);

router.delete(
  "/name/:id",
  middleware.authenticateAdmin,
  childCategoryBrandController.deleteChildCategoryBrand
);

router.get(
  "/byCategoryId/:id",
  middleware.authenticateAdmin,
  childCategoryBrandController.getChildCategoryBrandByCategoryId
);

module.exports = router;
