const express = require("express");
const router = express.Router();

// Import other admin routes

const parentActressCarouselRoutes = require("./ParentActressCarouselRoutes");
const childActressCarouselRoutes = require("./ChildActressCarouselRoutes");

// admin/menu/parent
router.use("/parent", parentActressCarouselRoutes);
// admin/menu/child
router.use("/child", childActressCarouselRoutes);

module.exports = router;
