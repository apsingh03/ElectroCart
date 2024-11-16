const express = require("express");
const router = express.Router();

// Import other admin routes

const ParentTestimonialRoutes = require("./ParentTestimonialRoutes");
const ChildTestimonialRoutes = require("./ChildTestimonialRoutes");

// admin/menu/parent
router.use("/parent", ParentTestimonialRoutes);
// admin/menu/child
router.use("/child", ChildTestimonialRoutes);

module.exports = router;
