const express = require("express");
const router = express.Router();

// Import other admin routes

const parentBannerCarouselRoutes = require("./ParentBannerCarouselRoutes");
const childBannerCarouselRoutes = require("./ChildBannerCarouselRoutes");

// admin/menu/parent
router.use("/parent", parentBannerCarouselRoutes);
// admin/menu/child
router.use("/child", childBannerCarouselRoutes);

module.exports = router;
