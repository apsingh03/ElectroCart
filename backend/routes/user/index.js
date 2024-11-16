const express = require("express");
const router = express.Router();

// Example client route
router.get("/", (req, res) => {
  res.send("Welcome to user  Dashboard");
});

// Import other client routes
const cartRoutes = require("./cart/cartRoutes");
const userRoutes = require("./user/userRoutes");

// All auth routes
router.use("/carts", cartRoutes);
router.use("/account", userRoutes);

module.exports = router;
