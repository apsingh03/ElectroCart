const express = require("express");
const router = express.Router();

// Import other admin routes

const parentMenuRoute = require("./ParentMenuRoutes");
const childMenuRoute = require("./ChildMenuRoutes");
const menuNestedSubMenu = require("./MenuNestedSubMenu");

// admin/menu/parent
router.use("/parent", parentMenuRoute);
// admin/menu/child
router.use("/child", childMenuRoute);
// admin/menu/menuNestedSubMenu
router.use("/menuNestedSubMenu", menuNestedSubMenu);

module.exports = router;
