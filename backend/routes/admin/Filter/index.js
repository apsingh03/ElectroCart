const express = require("express");
const router = express.Router();

// Import other admin routes

const parentFilterRoute = require("./ParentFilterRoutes");
const childFilterRoute = require("./ChildFilterRoutes");

// admin/filter/parent
router.use("/parent", parentFilterRoute);
// admin/filter/child
router.use("/child", childFilterRoute);

module.exports = router;
