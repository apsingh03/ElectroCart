const express = require("express");
const router = express.Router();

// Import other admin routes

const parentMenuRoute = require("./ParentMenuRoutes");
const childMenuRoute = require("./ChildMenuRoutes");

// admin/menu/parent
router.use("/parent", parentMenuRoute);
// admin/menu/child
router.use("/child", childMenuRoute);

module.exports = router;
