const express = require("express");
const router = express.Router();

// Import other admin routes

const parentCategoryBrandRoute = require("./ParentCategoryBrandRoutes");
const childCategoryBrandRoute = require("./ChildCategoryBrandRoutes");

// admin/menu/parent
router.use("/parent", parentCategoryBrandRoute);
// admin/menu/child
router.use("/child", childCategoryBrandRoute);

module.exports = router;
